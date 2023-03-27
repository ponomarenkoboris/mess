import { FC, MouseEvent, useContext } from 'react';
import { MessageContext } from '../MessageContext/MessageContext';
import { ActionTypes } from '../MessageContext/utils';
import useChatActions from '@hooks/useChatActions';
import './MessageSettings.scss';

enum ButtonValue {
    DELETE = 'Delete',
    EDIT = 'Edit'
}

export const MessageSettings: FC = () => {
    const { message, settings, dispatch } = useContext(MessageContext);
    const { deleteMessage } = useChatActions()

    const settingsClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) dispatch({ type: ActionTypes.HIDE_SETTINGS })

        const target = event.target as HTMLButtonElement

        if (target.textContent === ButtonValue.DELETE) deleteMessage(message)
        if (target.textContent === ButtonValue.EDIT) dispatch({ type: ActionTypes.CHANGE_TEXT_MESSAGE })
        dispatch({ type: ActionTypes.HIDE_SETTINGS })
    }

    return settings.isOpen ? (
        <div onClick={settingsClickHandler} className='message-settings__wrapper'>
            <div
                style={{ top: `${settings.axisY}px`, left: `${settings.axisX}px` }}
                className='message-settings'
            >
                <button className='stettings__option'>{ButtonValue.EDIT}</button>
                <button className='stettings__option delete'>{ButtonValue.DELETE}</button>
            </div>
        </div>
    ) : null;
};
