import { SyntheticEvent, Dispatch, MouseEvent, RefObject } from 'react';
import { Action, AudioPlayerActionTypes, AudioPlayerState } from './reducer';
import { recordTimer } from '@utils/utils';

const timeUpdateHandler = (event: SyntheticEvent<HTMLAudioElement, Event>, updateAudioState: Dispatch<Action>) => {
    const { currentTime, duration } = event.nativeEvent.target as HTMLAudioElement;
    const progressPersent = Number.isFinite(duration) ? (currentTime / duration) * 100 : (currentTime / recordTimer.duration) * 100;
    updateAudioState({ type: AudioPlayerActionTypes.UPDATE_PROGRESS, payload: progressPersent });

    if (currentTime === duration) {
        const payload: AudioPlayerState = { isPlaying: false, progress: progressPersent };
        updateAudioState({ type: AudioPlayerActionTypes.UPDATE_ALL, payload });
    }
};

const calculateRewind = (
    event: globalThis.MouseEvent,
    controller: HTMLButtonElement,
    playerTrack: HTMLDivElement,
    dispatch: Dispatch<Action>,
    audioRef: RefObject<HTMLAudioElement>,
) => {
    if (!audioRef?.current) return;
    const duration = Number.isFinite(audioRef.current.duration) ? audioRef.current.duration : recordTimer.duration;
    audioRef.current.pause();
    const { offsetWidth, offsetLeft } = playerTrack;

    if (event.pageX >= offsetLeft + offsetWidth) {
        controller.style.left = `${offsetWidth - 5}px`;
        audioRef.current.currentTime = duration;
        dispatch({ type: AudioPlayerActionTypes.UPDATE_PROGRESS, payload: 100 });
    } else if (event.pageX <= offsetLeft) {
        controller.style.left = `${0}px`;
        audioRef.current.currentTime = 0;
        dispatch({ type: AudioPlayerActionTypes.UPDATE_PROGRESS, payload: 0 });
    } else {
        controller.style.left = `${event.pageX - offsetLeft}px`;
        const progress = ((event.pageX - offsetLeft) / offsetWidth) * 100;
        audioRef.current.currentTime = (duration / 100) * progress;
        dispatch({ type: AudioPlayerActionTypes.UPDATE_PROGRESS, payload: progress });
    }
    controller.style.left = 'initial';
};

type RewindReturnType = {
    onMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
    cleanUp: () => void | null;
};

type AudioRewind = (dispatch: Dispatch<Action>, audioRef: RefObject<HTMLAudioElement> | null) => RewindReturnType;

type MouseMoveListenerType = ((e: globalThis.MouseEvent) => void) | null;
type MouseUpListenerType = (() => void) | null;

const audioRewind: AudioRewind = (dispatch, audioRef) => {
    let playerTrack: HTMLDivElement | null = null;
    let controller: HTMLButtonElement | null = null;
    let mouseMoveListener: MouseMoveListenerType = null;
    let mouseUpListener: MouseUpListenerType = null;

    const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
        if (!audioRef?.current) return;
        controller = event.currentTarget as HTMLButtonElement;
        playerTrack = document.querySelector('.player__progress') as HTMLDivElement;

        mouseMoveListener = (e: globalThis.MouseEvent) =>
            calculateRewind(e, controller as HTMLButtonElement, playerTrack as HTMLDivElement, dispatch, audioRef);

        mouseUpListener = () => mouseMoveListener && document.removeEventListener('mousemove', mouseMoveListener);

        if (playerTrack) {
            document.addEventListener('mousemove', mouseMoveListener);
            document.addEventListener('mouseup', mouseUpListener);
        }
    };

    const cleanUp = () => mouseUpListener && document.removeEventListener('mouseup', mouseUpListener);

    return {
        onMouseDown,
        cleanUp,
    };
};

export { timeUpdateHandler, audioRewind };
