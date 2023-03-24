import { FC } from 'react';
import './MessageSettings.scss';

export const MessageSettings: FC = () => {
    return (
        <div className='message-settings'>
            <button className='stettings__option'>Edit</button>
            <button className='stettings__option delete'>Delete</button>
        </div>
    );
};
