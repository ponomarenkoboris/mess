import type { KeyboardEvent, RefObject, Dispatch } from 'react'
import { ActionType, MessageType } from '@context/ChatContext'
import type { ActionCreator } from '@context/ChatContext'
import request, { Endpoints } from '@utils/axios.utils'

enum HotKeys {
    ENTER = 'Enter',
    CTRL = 'Control'
}

const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>, textareaRef: RefObject<HTMLTextAreaElement>): void => {
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
        const message = textareaRef.current.value
        console.log(message)
        textareaRef.current.value = ''
        return
    }
}


type SendFunctProps = [MessageType, Dispatch<ActionCreator>]

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

export {
    keyDownHandler,
    sendFile,
    sendText
}