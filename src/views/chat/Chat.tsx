import { FC } from 'react';
import { useTypedSelector } from '@hooks/storeHooks/storeHooks';
import { UserMessage } from '@components/chat-components';
import { ChatInput } from '@components/index';
import './Chat.scss';

export const Chat: FC = () => {
    const { userReducer, chatReducer } = useTypedSelector((state) => state);

    return (
        <main className='chat'>
            <div className='chat__messages'>
                {chatReducer[0].messages.map((message) => (
                    <UserMessage
                        key={message.id}
                        username={userReducer.username}
                        owner={message.owner}
                        content={message.content}
                        sendDate={message.sendDate}
                    />
                ))}
            </div>
            <ChatInput />
        </main>
    );
};
