enum VoiceReducerActionType {
    SET_AUDIO = 'SET_DATA',
    SET_RECORDER = 'SET_RECORDER',
    SET_IS_RECORDING = 'SET_IS_RECORDING',
}

type VoiceReducerActionPayload = MediaRecorder | Blob | boolean | null;
type VoiceReducer = {
    type: VoiceReducerActionType;
    payload: VoiceReducerActionPayload;
};

type VoiceState = {
    recorder: MediaRecorder | null;
    audio: Blob | null;
    isRecording: boolean;
};

const initialState: VoiceState = {
    recorder: null,
    audio: null,
    isRecording: false,
};

const reducer = (state: VoiceState, { type, payload }: VoiceReducer): VoiceState => {
    switch (type) {
        case VoiceReducerActionType.SET_AUDIO:
            return {
                ...state,
                audio: payload as Exclude<VoiceReducerActionPayload, MediaRecorder | boolean>,
            };
        case VoiceReducerActionType.SET_RECORDER:
            return {
                ...state,
                recorder: payload as Exclude<VoiceReducerActionPayload, Blob | boolean>,
            };
        case VoiceReducerActionType.SET_IS_RECORDING:
            return {
                ...state,
                isRecording: payload as Exclude<VoiceReducerActionPayload, Blob | null | MediaRecorder>,
            };
        default:
            return state;
    }
};

export { initialState, reducer, VoiceReducerActionType };
