import { FC, MouseEvent } from 'react';
import type { Message } from '@models/chat.model';
import './UserMessage.scss';

type UserMessageProps = Message & { username: string };

export const UserMessage: FC<UserMessageProps> = ({ username, owner, content, sendDate }) => {
    
    const rightMouseClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    return (
        <div 
            onContextMenu={rightMouseClick}
            className={username === owner ? 'message owner' : 'message'}
        >
            <p className='message__content'>{content.value as string}</p>
            <p className='message__date'>{sendDate}</p>
        </div>
    );
};
