import { FC, ChangeEvent, useRef } from 'react';
import type { Content } from '@models/chat.model';
import clip from '@assets/chat_page/clip.svg';
import { ActionType, ActionCreator } from '../ChatInput/chatInput.utils';

interface DocumentProps {
    onDocumentUpload: (content: ActionCreator) => void;
}

export const Document: FC<DocumentProps> = ({ onDocumentUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadDocsHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!event.target.files) return;
        const file = event.target.files.item(0);
        if (!file) return;

        const payload: Content = { type: 'file', value: file };
        onDocumentUpload({ type: ActionType.DOCUMENT, payload });
        event.target.value = '';
    };

    return (
        <button className={'user-input_docs'} onClick={() => fileInputRef.current?.click()}>
            <input type='file' ref={fileInputRef} accept='.doc,.docx,.txt' onChange={uploadDocsHandler} />
            <img loading='lazy' src={clip} alt='Documents' />
        </button>
    );
};
