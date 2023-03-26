import { FC, MouseEvent, useContext } from 'react';
import { MessageContext } from '../MessageContext/MessageContext';
import { ActionTypes } from '../MessageContext/utils';
import './MessageSettings.scss';

export const MessageSettings: FC = () => {
    const { settings, dispatch } = useContext(MessageContext);
    
    const settingsClickHandler = (event: MouseEvent<HTMLDivElement>) => {
        if (event.currentTarget === event.target) dispatch({ type: ActionTypes.HIDE_SETTINGS })
    }

    return settings.isOpen ? (
        <div onClick={settingsClickHandler} className='message-settings__wrapper'>
            <div
                style={{ top: `${settings.axisY}px`, left: `${settings.axisX}px` }}
                className='message-settings'
            >
                <button className='stettings__option'>Edit</button>
                <button className='stettings__option delete'>Delete</button>
            </div>
        </div>
    ) : null;
};
