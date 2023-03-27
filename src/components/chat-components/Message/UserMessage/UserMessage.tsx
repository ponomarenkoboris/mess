import { FC, MouseEvent, useContext } from 'react';
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
export const UserMessage: FC<UserMessageProps> = (props) => {
    const { dispatch } = useContext(MessageContext);

    const rightMouseClick = (event: MouseEvent<HTMLDivElement>) => {
        if (props.username !== props.owner) return
        event.preventDefault()
        const axisX = event.pageX - SETTINGS_MODAL_WIDTH;
        const settings = { isOpen: true, axisX, axisY: event.pageY };
        const modal = { isOpen: false }
        dispatch({ type: ActionTypes.DISPLAY_SETTINGS, payload: { message: props, settings, modal } })
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