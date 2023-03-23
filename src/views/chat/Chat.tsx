import { FC } from 'react';
import { useAppSelector } from '@hooks/storeHooks/storeHooks';
import { ChatInput } from '@components/index';
import './Chat.scss';

export const Chat: FC = () => {
    const { user, chats } = useAppSelector((state) => state);

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
                {chats[0].messages.map((message) => (
                    <div key={message.id} className={user.username === message.owner ? 'message owner' : 'message'}>
                        <p className='message__content'>{message.content.value as string}</p>
                        <p className='message__date'>{message.sendDate}</p>
                    </div>
                ))}
            </div>
            <ChatInput />
        </main>
    );
};
