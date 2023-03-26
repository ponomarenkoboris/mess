import { FC, MouseEvent, useContext, memo } from 'react';
import type { Message } from '@models/chat.model';
import { MessageContext } from '../MessageContext/MessageContext';
import { ActionTypes } from '../MessageContext/utils';
import './UserMessage.scss';

const SETTINGS_MODAL_WIDTH = 150;
type UserMessageProps = Message & { username: string };
/**
 * // BUG
 * Uncaught TypeError: Cannot read properties of null (reading 'target')
 */
const Message: FC<UserMessageProps> = (props) => {
    const { dispatch } = useContext(MessageContext);

    const rightMouseClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        const axisX = props.username === props.owner ? event.pageX - SETTINGS_MODAL_WIDTH : event.pageX;
        const settings = { isOpen: true, axisX, axisY: event.pageY };
        dispatch({ type: ActionTypes.DISPLAY_SETTINGS, payload: { message: props, settings } })
    }

    return (
        <div 
            onContextMenu={rightMouseClick}
            className={props.username === props.owner ? 'message owner' : 'message'}
        >
            <p className='message__content'>{props.content.value as string}</p>
            <p className='message__date'>{props.sendDate}</p>
        </div>
    );
};

export const UserMessage = memo(Message);
