import { FC } from 'react';
import type { Message } from '@models/chat.model';
import './UserMessage.scss';

type UserMessageProps = Omit<Message & { username: string }, 'id' | 'chatId'>;

export const UserMessage: FC<UserMessageProps> = ({ username, owner, content, sendDate }) => {
    return (
        <div className={username === owner ? 'message owner' : 'message'}>
            <p className='message__content'>{content.value as string}</p>
            <p className='message__date'>{sendDate}</p>
        </div>
    );
};
