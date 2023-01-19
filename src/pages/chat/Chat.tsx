import { FC, useRef, useContext } from 'react'
import { ChatInputContext, ActionType } from '@context/ChatContext'
import { keyDownHandler, sendText, sendFile } from './chat.utils'
import { Document } from './document/Document'
import { Voice } from './voice/Voice'
import accept from '@assets/chat_page/accept.svg'
import remove from '@assets/chat_page/remove.svg'
import file from '@assets/chat_page/file.svg'
import smile from '@assets/chat_page/smile-svgrepo-com.svg'
import './chat.scss'

export const Chat: FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [value, dispatch] = useContext(ChatInputContext)

    const submitSend = () => {
        if (typeof value === 'string') {
            sendText([value, dispatch])
        } else {
            sendFile([value, dispatch])
        }
    }

    return (
        <div className="chat">
            <div className="chat__messages">
                <p>message</p>
                <p>message</p>
                <p>message</p>
                <p>message</p>
            </div>
            <div className="chat__user-input">
                <Document />
                <Voice />
                { typeof value === 'string' 
                ? 
                    <textarea 
                        ref={textareaRef} 
                        onKeyDown={e => keyDownHandler(e, textareaRef)} 
                        className='user-input_text' 
                        placeholder={`Message in #${'general'}`}
                    ></textarea>
                : 
                    <div className='user-input_uploaded-file'>
                        <div className="file-wrapper">
                            <img loading='lazy' src={file} alt="File" />
                            <p>{value.name}</p>
                        </div>
                        <div className="send-remove-buttons">
                            <button className='remove-file-button' onClick={() => dispatch({ type: ActionType.RESET })}>
                                <img loading='lazy' src={remove} alt="Remove file" />
                            </button>
                            <button className='send-file-button'>
                                <img loading='lazy' src={accept} alt="Send message" onClick={submitSend} />
                            </button>
                        </div>
                    </div>
                }
                <button className='user-input_smiles'>
                    <img loading='lazy' src={smile} alt="Smiles" />
                </button>
            </div>
        </div>
    )
}
