import { FC, useState } from 'react'
import VoiceRecorder from './voice.utils'
import micro from '@assets/chat_page/microphone.svg' 
import square from '@assets/chat_page/square.svg'

const voiceRecorder = new VoiceRecorder()

export const Voice: FC = () => {
    const [isRecording, setIsRecording] = useState<boolean>(false)

    const startRecording = () => {
        setIsRecording(true)
        voiceRecorder.startRecord()
    }

    const stopRecording = async () => {
        setIsRecording(false)
        const audio = voiceRecorder.stopRecord()
        if (audio) {
            console.log(audio)
        }
    }

    return !isRecording        
        ?
        <button className={'user-input_voice'} onClick={startRecording}>
            <img loading='lazy' src={micro} alt="Voice" />
        </button>
        :
        <button className='user-input_voice' onClick={stopRecording}>
            <img loading='lazy' src={square} alt="Stop record" />
        </button>
    
    
}
