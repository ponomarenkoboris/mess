import type { KeyboardEvent, RefObject, Dispatch } from 'react'
import { ActionType, Message } from '@context/ChatContext'
import type { ActionCreator } from '@context/ChatContext'
import request, { Endpoints } from '@utils/axios.utils'

enum HotKeys {
    ENTER = 'Enter',
    CTRL = 'Control'
}

const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>, textareaRef: RefObject<HTMLTextAreaElement>, setMessageState: Dispatch<ActionCreator>): void => {
    if (!textareaRef.current?.value) {
        if (event.key === HotKeys.ENTER) event.preventDefault()
        return
    }

    if (event.key === HotKeys.ENTER && event.ctrlKey) {
        event.preventDefault()
        textareaRef.current.value += '\n'
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight
        return
    }

    if (event.key === HotKeys.ENTER && !event.ctrlKey) {
        event.preventDefault()
        const payload: Message = {type: 'text', value: textareaRef.current.value}
        setMessageState({ type: ActionType.TEXT, payload })
        textareaRef.current.value = ''
        return
    }
}


type SendFunctProps = [Message['value'], Dispatch<ActionCreator>]

const sendFile = (value: SendFunctProps) => {
    const [file, dispatch] = value

    const formData = new FormData()
    formData.append('file', file)

    const configuration = {
        body: formData
    }
    request.post(Endpoints.sendMessage, configuration).catch(console.error)
    dispatch({ type: ActionType.RESET })
}

const sendText = (value: SendFunctProps) => {
    const [text, dispatch] = value

    const configuration = {
        body: JSON.stringify(text)
    }

    request.post(Endpoints.sendMessage, configuration).catch(console.error)
    dispatch({ type: ActionType.RESET })
}

const sendAudio = (value: SendFunctProps) => {
    console.log('audio', value)
}

export {
    keyDownHandler,
    sendFile,
    sendText,
    sendAudio
}