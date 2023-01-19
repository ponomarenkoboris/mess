import { FC, ChangeEvent, useContext, useRef } from 'react'
import { ChatInputContext, ActionType } from '@context/ChatContext'
import clip from '@assets/chat_page/clip.svg'

export const Document: FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [, dispatch] = useContext(ChatInputContext)
    const uploadDocsHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!event.target.files) return
        const file = event.target.files.item(0)!
        dispatch({ type: ActionType.DOCUMENT, payload: file })
        event.target.value = ''
    }

    return (
        <button className={'user-input_docs'} onClick={() => fileInputRef.current?.click()}>
            <input type="file" ref={fileInputRef} accept='.doc,.docx,.txt' onChange={uploadDocsHandler} />
            <img loading='lazy' src={clip} alt="Documents" />
        </button>
    )
}
