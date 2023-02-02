import { FC, useRef, useContext, useState } from 'react';
import { ChatInputContext, ActionType } from '@context/ChatContext';
import { keyDownHandler, sendText, sendFile, sendAudio } from './chat.utils';
import { SubmitFileSend, Document, Voice, AudioPlayer, EmojiSelector } from '@components/index';
import file from '@assets/chat_page/file.svg';
import smile from '@assets/chat_page/smile-svgrepo-com.svg';
import './Chat.scss';

export const Chat: FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [messageState, dispatch] = useContext(ChatInputContext);
    const [isShowEmojiSelector, setIsShowEmojiSelector] = useState<boolean>(false);

    const submitSend = () => {
        const { type, value } = messageState;
        if (type === 'text') sendText([value, dispatch]);
        if (type === 'file') sendFile([value, dispatch]);
        if (type === 'audio') sendAudio([value, dispatch]);
    };

    const toogleEmojiSelector = () => setIsShowEmojiSelector(!isShowEmojiSelector);
    const insertEmoji = (emoji: string) => {
        if (textareaRef.current) textareaRef.current.value += emoji;
    };

    return (
        <main className='chat'>
            <div className='chat__messages'>
                {Array(100)
                    .fill(1)
                    .map((_, idx) => (
                        <p key={idx}>message</p>
                    ))}
            </div>
            <div className='chat__user-input'>
                <Document />
                <Voice />
                {messageState.type === 'text' ? (
                    <textarea
                        ref={textareaRef}
                        onKeyDown={(e) => keyDownHandler(e, textareaRef, dispatch)}
                        className='user-input_text'
                        placeholder={`Message in #${'general'}`}
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
                    <img loading='lazy' src={smile} alt='Smiles' />
                </button>
                {isShowEmojiSelector && (
                    <EmojiSelector closeCallback={() => setIsShowEmojiSelector(!isShowEmojiSelector)} insertEmoji={insertEmoji} />
                )}
            </div>
        </main>
    );
};
