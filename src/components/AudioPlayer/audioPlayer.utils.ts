import { SyntheticEvent, Dispatch } from 'react';
import { Action, AudioPlayerActionTypes, AudioPlayerState } from './reducer';

// BUG duration of audio element is Infinity (https://qna.habr.com/q/1125046)
export const timeUpdateHandler = (event: SyntheticEvent<HTMLAudioElement, Event>, updateAudioState: Dispatch<Action>) => {
    const { currentTime, duration } = event.nativeEvent.target as HTMLAudioElement;
    const progressPersent = currentTime / duration * 100;
    updateAudioState({ type: AudioPlayerActionTypes.UPDATE_PROGRESS, payload: progressPersent });

    if (currentTime === duration) {
        const payload: AudioPlayerState = { isPlaying: false, progress: progressPersent };
        updateAudioState({ type: AudioPlayerActionTypes.UPDATE_ALL, payload });
    }
};