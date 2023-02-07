import { FC, useState, MouseEvent, useEffect } from 'react';
import './EmojiSelector.scss';
import emojies from './emoji.json';

interface EmojiSelectorProps {
    closeCallback: () => void;
    insertEmoji: (code: string) => void;
}

const listenerCreator = (closeCallback: EmojiSelectorProps['closeCallback']): ((event: globalThis.MouseEvent) => void) => {
    return (event: globalThis.MouseEvent) => {
        const element = event.target as HTMLElement;
        const isOpenButton = element.classList.contains('user-input_smiles-picture') || element.classList.contains('user-input_smiles');
        if (!element.classList.contains('smiles__list') && !isOpenButton) closeCallback();
    };
};

export const EmojiSelector: FC<EmojiSelectorProps> = ({ closeCallback, insertEmoji }) => {
    const groups = Object.keys(emojies);
    const [name, setName] = useState(groups[0]);
    const [currentEmojies, setCurrentEmojies] = useState(emojies[groups[0] as keyof typeof emojies]);
    const listener = listenerCreator(closeCallback);

    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;

        if (target.className.match('group__button')) {
            const name = target.dataset.group as keyof typeof emojies;
            const list = emojies[name];
            setName(name);
            setCurrentEmojies(list);
            return;
        }

        if (target.className === 'emoji') {
            const emoji = target.dataset.emoji as string;
            insertEmoji(emoji);
            closeCallback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', listener);
        return () => document.removeEventListener('click', listener);
    }, []);

    return (
        <div className='smiles__list' onClick={clickHandler}>
            <div className='emoji__groups'>
                {groups.map((groupName) => (
                    <button className={`group__button ${groupName === name ? 'active' : ''}`} key={groupName} data-group={groupName}>
                        {groupName}
                    </button>
                ))}
            </div>
            <div className='emoji__list'>
                {currentEmojies.map(({ no, emoji }) => (
                    <div key={no} data-emoji={emoji} className='emoji'>
                        {emoji}
                    </div>
                ))}
            </div>
        </div>
    );
};
