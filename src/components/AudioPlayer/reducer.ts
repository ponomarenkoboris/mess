enum AudioPlayerActionTypes {
    UPDATE_PROGRESS = 'UPDATE_PROGRESS',
    SET_IS_PLAYING = 'SET_IS_PLAYING',
    UPDATE_ALL = 'UPDATE_ALL'
}

export type AudioPlayerState = { isPlaying: boolean, progress: number };
export type Action = { 
    type: AudioPlayerActionTypes, 
    payload: AudioPlayerState | AudioPlayerState['isPlaying'] | AudioPlayerState['progress'] 
};

const initialState: AudioPlayerState = { isPlaying: false, progress: 0 };
const reducer = (state: AudioPlayerState, action: Action): AudioPlayerState => {
    switch(action.type) {
        case AudioPlayerActionTypes.SET_IS_PLAYING:
            return { ...state, isPlaying: action.payload as boolean };
        case AudioPlayerActionTypes.UPDATE_PROGRESS:
            return { ...state, progress: action.payload as number };
        case AudioPlayerActionTypes.UPDATE_ALL:
            return { ...action.payload as AudioPlayerState }
        default:
            return state;
    }
}

export {
    initialState,
    reducer,
    AudioPlayerActionTypes
}