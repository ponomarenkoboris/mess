import { FC, memo, useRef, KeyboardEvent, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks/storeHooks';
import { Document } from '../Document/Document';
import { Voice } from '../Voice/Voice';
import { SubmitFileSend } from '../SubmitFileSend/SubmitFileSend';
import { EmojiSelector } from '../EmojiSelector/EmojiSelector';
import { Message } from '@models/chat.model';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer';
import file from '@assets/chat_page/file.svg';
import { appendMessage } from '@store/chat/chat';
import { sendFile, sendAudio, keyDownListener, reducer, defaultState, ActionType, ActionCreator } from './chatInput.utils';
import './ChatInput.scss';

const Input: FC = () => {
    const { chatId } = useParams();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const storeDispatch = useAppDispatch();
    const [messageState, dispatch] = useReducer(reducer, defaultState);
    const user = useAppSelector((store) => store.user);

    const submitSend = () => {
        const { type, value } = messageState;
        if (type === 'file') sendFile([value, dispatch]);
        if (type === 'audio') sendAudio([value, dispatch]);
    };

    const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        const content = keyDownListener(event, textareaRef);
        if (content) {
            const message: Message = {
                id: new Date().getTime(),
                content,
                owner: user.username,
                sendDate: new Date().toLocaleDateString(),
                chatId: 1,
            };
            storeDispatch(appendMessage(message));
        }
    };

    const insertEmoji = (emoji: string) => {
        if (textareaRef.current) textareaRef.current.value += emoji;
    };

    return (
        <div className='chat__user-input'>
            <Document onDocumentUpload={(actionCreator: ActionCreator) => dispatch(actionCreator)} />
            <Voice onStopRecord={(actionCreator: ActionCreator) => dispatch(actionCreator)} />
            {messageState.type === 'text' ? (
                <textarea ref={textareaRef} onKeyDown={keyDownHandler} className='user-input_text' placeholder={`Message in #${chatId}`}></textarea>
            ) : (
                <div className='user-input_uploaded-file'>
                    {messageState.type === 'file' && (
                        <div className='file-wrapper'>
                            <img loading='lazy' src={file} alt='File' />
                            <p>{(messageState.value as File).name}</p>
                        </div>
                    )}
                    {messageState.type === 'audio' && <AudioPlayer src={messageState.value as string} />}
                    <SubmitFileSend onRemove={() => dispatch({ type: ActionType.RESET })} onSend={submitSend} />
                </div>
            )}
            <EmojiSelector insertEmoji={insertEmoji} />
        </div>
    );
};

export const ChatInput = memo(Input);
