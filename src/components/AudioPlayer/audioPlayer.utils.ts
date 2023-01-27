import { SyntheticEvent, Dispatch, MouseEvent } from 'react';
import { Action, AudioPlayerActionTypes, AudioPlayerState } from './reducer';
import { recordTimer } from '@utils/utils';

const timeUpdateHandler = (
    event: SyntheticEvent<HTMLAudioElement, Event>,
    updateAudioState: Dispatch<Action>,
) => {
    const { currentTime, duration } = event.nativeEvent.target as HTMLAudioElement;
    const progressPersent = Number.isFinite(duration)
        ? (currentTime / duration) * 100
        : (currentTime / recordTimer.duration) * 100;
    updateAudioState({ type: AudioPlayerActionTypes.UPDATE_PROGRESS, payload: progressPersent });

    if (currentTime === duration) {
        const payload: AudioPlayerState = { isPlaying: false, progress: progressPersent };
        updateAudioState({ type: AudioPlayerActionTypes.UPDATE_ALL, payload });
    }
};

type RewindReturnType = {
    onMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
    onMouseUp: (e: MouseEvent<HTMLButtonElement>) => void;
};

const calculateRewind = (
    event: globalThis.MouseEvent,
    controller: HTMLButtonElement,
    player: HTMLDivElement,
) => {
    const { offsetWidth, offsetLeft } = player;
    if (event.pageX >= offsetLeft + offsetWidth) {
        controller.style.left = `${offsetWidth}px`;
    } else if (event.pageX <= offsetLeft) {
        controller.style.left = `${0}px`;
    } else {
        controller.style.left = `${event.pageX - offsetLeft}px`;
    }
};

// BUG
/**
 * BUG: rewind logic working incorrect, also append cleanUp for removing event listeners
 */
const audioRewind = (): RewindReturnType => {
    const player = document.querySelector('.player__progress') as HTMLDivElement;

    const onMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
        console.log('mousedown');
        const controller = event.target as HTMLButtonElement;
        if (player)
            document.addEventListener('mousemove', (e) => calculateRewind(e, controller, player));
    };

    const onMouseUp = (event: MouseEvent<HTMLButtonElement>) => {
        console.log('mouseup');
        const controller = event.target as HTMLButtonElement;
        if (player)
            document.removeEventListener('mousemove', (e) =>
                calculateRewind(e, controller, player),
            );
    };

    return {
        onMouseDown,
        onMouseUp,
    };
};

export { timeUpdateHandler, audioRewind };
