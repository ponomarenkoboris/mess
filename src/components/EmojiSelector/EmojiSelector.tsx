import { FC, useState, MouseEvent } from 'react';
import './EmojiSelector.scss';
import emojies from './emoji.json';

interface EmojiSelectorProps {
    closeCallback: () => void;
    insertEmoji: (code: string) => void;
}

export const EmojiSelector: FC<EmojiSelectorProps> = ({ closeCallback, insertEmoji }) => {
    const groups = Object.keys(emojies);
    const [name, setName] = useState(groups[0])
    const [currentEmojies, setCurrentEmojies] = useState(emojies[groups[0] as keyof typeof emojies]);

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
