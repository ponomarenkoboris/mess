import { ChangeEvent, FC } from 'react';
import './SettingsInput.scss';

interface SettingsInputProps {
    defaultValue: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    labelClassName: string;
}

export const SettingsInput: FC<SettingsInputProps> = ({ labelClassName, ...props }) => {
    return (
        <label className={labelClassName}>
            <input type='text' {...props} />
            <div className='writeble-element-indicator'></div>
        </label>
    );
};
