import { FC, useRef } from 'react'
import { keyDownHandler, docsHandler, ButtonClassNames, userInputClickHandler } from './chat.utils'
import docs from '@assets/chat_page/document.svg'
import micro from '@assets/chat_page/microphone.svg'
import smile from '@assets/chat_page/smile-svgrepo-com.svg'
import './chat.scss'



export const Chat: FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    return (
        <div className="chat">
            <div className="chat__messages">
                <p>message</p>
                <p>message</p>
                <p>message</p>
                <p>message</p>
            </div>
            <div className="chat__user-input" onClick={userInputClickHandler}>
                <button className={ButtonClassNames.DOCS}>
                    <input type="file" accept='.doc,.docx,.txt' onChange={docsHandler} />
                    <img src={docs} alt="Documents" />
                </button>
                <button className={ButtonClassNames.VOICE}>
                    <img src={micro} alt="Voice" />
                </button>
                <textarea ref={textareaRef} onKeyDown={e => keyDownHandler(e, textareaRef)} className='user-input_text' placeholder={`Message in #${'general'}`}></textarea>
                <button className={ButtonClassNames.SMILES}>
                    <img src={smile} alt="Smiles" />
                </button>
            </div>
        </div>
    )
}
