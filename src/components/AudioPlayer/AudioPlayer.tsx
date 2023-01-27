import { FC, useRef, useReducer, useEffect } from 'react';
import { timeUpdateHandler, audioRewind } from './audioPlayer.utils';
import { reducer, initialState, AudioPlayerActionTypes } from './reducer';
import play from '@assets/chat_page/play-button.svg';
import pause from '@assets/chat_page/pause-button.svg';
import './AudioPlayer.scss';

interface AudioPlayerProps {
    src: string;
}

export const AudioPlayer: FC<AudioPlayerProps> = ({ src }) => {
    const [{ isPlaying, progress }, dispatch] = useReducer(reducer, initialState);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { cleanUp, onMouseDown } = audioRewind(dispatch, audioRef);

    const contorllerHandler = () => {
        if (!isPlaying) {
            audioRef.current?.play();
            dispatch({ type: AudioPlayerActionTypes.SET_IS_PLAYING, payload: true });
        } else {
            audioRef.current?.pause();
            dispatch({ type: AudioPlayerActionTypes.SET_IS_PLAYING, payload: false });
        }
    };

    useEffect(() => {
        return () => {
            cleanUp();
        };
    }, []);

    return (
        <div className='audio-wrapper'>
            <audio ref={audioRef} src={src} onTimeUpdate={(e) => timeUpdateHandler(e, dispatch)}>
                <track kind='captions' />
            </audio>
            <div className='audio__player'>
                <button className='player__controller' onClick={contorllerHandler}>
                    {!isPlaying ? <img src={play} alt='Play voice message' /> : <img src={pause} alt='Pause voice message' />}
                </button>
                <div className='player__progress'>
                    <div style={{ width: `${progress}%` }} className='progress'>
                        <button className='progress__controller' onMouseDown={onMouseDown}></button>
                    </div>
                </div>
            </div>
        </div>
    );
};
