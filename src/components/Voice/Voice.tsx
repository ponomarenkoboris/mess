import { FC, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer, VoiceReducerActionType } from './voice.utils';
import { ChatInputContext, ActionType, Message } from '@context/ChatContext';
import micro from '@assets/chat_page/microphone.svg';
import square from '@assets/chat_page/square.svg';
import './Voice.scss';

export const Voice: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [, contextDispatch] = useContext(ChatInputContext);

    const startRecording = () => {
        if (state.recorder) {
            state.recorder.start();
            dispatch({ type: VoiceReducerActionType.SET_IS_RECORDING, payload: true });
        }
    };

    const stopRecording = async () => {
        if (state.recorder) {
            state.recorder.stop();
            dispatch({ type: VoiceReducerActionType.SET_IS_RECORDING, payload: false });
        }
    };

    useEffect(() => {
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
                const recorder = new MediaRecorder(stream);
                recorder.addEventListener('dataavailable', (e) => {
                    const audio = new Blob([e.data], { type: 'audio/ogg; codecs=opus' });
                    dispatch({ type: VoiceReducerActionType.SET_AUDIO, payload: audio });
                });

                dispatch({ type: VoiceReducerActionType.SET_RECORDER, payload: recorder });
            });
        }
    }, []);

    useEffect(() => {
        if (state.audio) {
            const url = URL.createObjectURL(state.audio);
            const payload: Message = { type: 'audio', value: url };
            contextDispatch({ type: ActionType.VOICE, payload });
        }
    }, [state.audio]);

    return !state.isRecording ? (
        <button className={'user-input_voice'} onClick={startRecording}>
            <img loading='lazy' src={micro} alt='Voice' />
        </button>
    ) : (
        <button className='user-input_voice-stop' onClick={stopRecording}>
            <img className='stop-record-img' loading='lazy' src={square} alt='Stop record' />
        </button>
    );
};
