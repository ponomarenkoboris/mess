import type { KeyboardEvent, RefObject, Dispatch } from 'react';
import { Content } from '@store/models/chat.model';
import request, { Endpoints } from '@utils/request.utils';

export type ActionCreator = { type: ActionType; payload?: Content };

const defaultState: Content = { type: 'text', value: '' };

enum ActionType {
    DOCUMENT = 'DOCUMENT',
    VOICE = 'VOICE',
    TEXT = 'TEXT',
    RESET = 'RESET',
}

const reducer = (state: Content, action: ActionCreator): Content => {
    switch (action.type) {
        case ActionType.TEXT:
            const textMessage = action.payload;
            if (!textMessage) return state;
            return { type: textMessage.type, value: textMessage.value };

        case ActionType.DOCUMENT:
            const fileMessage = action.payload;
            if (!fileMessage) return state;
            return { type: fileMessage.type, value: fileMessage.value };

        case ActionType.VOICE:
            const audioMessage = action.payload;
            if (!audioMessage) return state;
            return { type: audioMessage.type, value: audioMessage.value };

        case ActionType.RESET:
            return { type: 'text', value: '' };

        default:
            return state;
    }
};

enum HotKeys {
    ENTER = 'Enter',
    CTRL = 'Control',
}

const keyDownListener = (
    event: KeyboardEvent<HTMLTextAreaElement>,
    textareaRef: RefObject<HTMLTextAreaElement>,
): false | Content => {
    if (!textareaRef.current?.value) {
        if (event.key === HotKeys.ENTER) event.preventDefault();
        return false;
    }

    if (event.key === HotKeys.ENTER && event.ctrlKey) {
        event.preventDefault();
        textareaRef.current.value += '\n';
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        return false;
    }

    if (event.key === HotKeys.ENTER && !event.ctrlKey) {
        event.preventDefault();
        const payload: Content = { type: 'text', value: textareaRef.current.value };
        textareaRef.current.value = '';
        return payload;
    }

    return false
};

type SendFunctProps = [Content['value'], Dispatch<ActionCreator>];

const sendFile = (value: SendFunctProps) => {
    const [file, dispatch] = value;

    const formData = new FormData();
    formData.append('file', file);

    const configuration = {
        body: formData,
    };
    request.post(Endpoints.sendMessage, configuration).catch(console.error);
    dispatch({ type: ActionType.RESET });
};

const sendText = (value: SendFunctProps) => {
    const [text, dispatch] = value;

    const configuration = {
        body: JSON.stringify(text),
    };

    request.post(Endpoints.sendMessage, configuration).catch(console.error);
    dispatch({ type: ActionType.RESET });
};

const sendAudio = (value: SendFunctProps) => {
    console.log('audio', value);
};

export { 
    keyDownListener, 
    sendFile, 
    sendText, 
    sendAudio,
    reducer, 
    defaultState,
    ActionType
};
