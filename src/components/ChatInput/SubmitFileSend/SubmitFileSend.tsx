import { FC } from 'react';
import accept from '@assets/chat_page/accept.svg';
import remove from '@assets/chat_page/remove.svg';
import './SubmitFileSend.scss';

interface SubmitFileSendProps {
    onSend: () => void;
    onRemove: () => void;
}

export const SubmitFileSend: FC<SubmitFileSendProps> = ({ onRemove, onSend }) => {
    return (
        <div className='send-remove-buttons'>
            <button className='remove-file-button' onClick={onRemove}>
                <img loading='lazy' src={remove} alt='Remove file' />
            </button>
            <button className='send-file-button' onClick={onSend}>
                <img loading='lazy' src={accept} alt='Send message' />
            </button>
        </div>
    );
};
