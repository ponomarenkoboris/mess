import type { KeyboardEvent, RefObject, Dispatch } from 'react';
import { ActionType } from '@context/ChatContext';
import { Content } from '@store/models/chat.model';
import type { ActionCreator } from '@context/ChatContext';
import request, { Endpoints } from '@utils/request.utils';

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

export { keyDownListener, sendFile, sendText, sendAudio };
