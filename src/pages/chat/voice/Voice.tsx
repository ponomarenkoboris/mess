import { FC } from 'react'
import micro from '@assets/chat_page/microphone.svg' 


export const Voice: FC = () => {
    return (
        <button className={'user-input_voice'}>
            <img loading='lazy' src={micro} alt="Voice" />
        </button>
    )
}
