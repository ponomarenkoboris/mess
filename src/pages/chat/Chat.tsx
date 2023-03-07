import { FC, useRef, useContext, useState, KeyboardEvent } from 'react';
import { ChatInputContext, ActionType } from '@context/ChatContext';
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks/storeHooks'
import { appendMessage } from '@store/chat/chat'
import type { Message } from '@store/models/chat.model'
import { useParams } from 'react-router-dom';
import { keyDownListener, sendFile, sendAudio } from './chat.utils';
import { SubmitFileSend, Document, Voice, AudioPlayer, EmojiSelector } from '@components/index';
import file from '@assets/chat_page/file.svg';
import smile from '@assets/chat_page/smile-svgrepo-com.svg';
import './Chat.scss';

export const Chat: FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { chatId } = useParams();
    const [messageState, dispatch] = useContext(ChatInputContext);
    const { user, chats } = useAppSelector(state => state)
    const storeDispatch = useAppDispatch()
    const [isShowEmojiSelector, setIsShowEmojiSelector] = useState<boolean>(false);

    const submitSend = () => {
        const { type, value } = messageState;
        if (type === 'file') sendFile([value, dispatch]);
        if (type === 'audio') sendAudio([value, dispatch]);
        
    };

    const keyDownHandler = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        const content = keyDownListener(event, textareaRef)
        if (content) {
            const message: Message = {
                id: new Date().getTime(),
                content,
                owner: user.username,
                sendDate: new Date().toLocaleDateString(),
                chatId: 1
            }
            storeDispatch(appendMessage(message));
        }
    }

    const toogleEmojiSelector = () => setIsShowEmojiSelector(!isShowEmojiSelector);
    const insertEmoji = (emoji: string) => {
        if (textareaRef.current) textareaRef.current.value += emoji;
    };

    return (
        <main className='chat'>
            <div className='chat__messages'>
                {/* {Array(100)
                    .fill(1)
                    .concat(chats[0].messages)
                    .map((_, idx) => (
                        <p key={idx}>message</p>
                    ))
                    } */}
                {chats[0].messages.map(message => (
                    <div key={message.id} className={user.username === message.owner ? 'message owner' : 'message'}>
                        <p className='message__content'>{message.content.value as string}</p>
                        <p className='message__date'>{message.sendDate}</p>
                    </div>
                ))}
            </div>
            <div className='chat__user-input'>
                <Document />
                <Voice />
                {messageState.type === 'text' ? (
                    <textarea
                        ref={textareaRef}
                        onKeyDown={keyDownHandler}
                        className='user-input_text'
                        placeholder={`Message in #${chatId}`}
                    ></textarea>
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
                <button className='user-input_smiles' onClick={toogleEmojiSelector}>
                    <img className='user-input_smiles-picture' loading='lazy' src={smile} alt='Smiles' />
                </button>
                {isShowEmojiSelector && (
                    <EmojiSelector closeCallback={() => setIsShowEmojiSelector(!isShowEmojiSelector)} insertEmoji={insertEmoji} />
                )}
            </div>
        </main>
    );
};
