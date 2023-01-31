import { FC, useMemo, useState, MouseEvent } from 'react';
import './EmojiSelector.scss';
import emojies from './emoji.json';

interface EmojiSelectorProps {
    closeCallback: () => void;
    insertEmoji: (code: string) => void;
}

// TODO append styles for emoji modal
export const EmojiSelector: FC<EmojiSelectorProps> = ({ closeCallback, insertEmoji }) => {
    const emojiesList = useMemo(() => emojies, []);
    const groups = Object.keys(emojiesList);

    const [currentEmojies, setCurrentEmojies] = useState(emojiesList[groups[0] as keyof typeof emojiesList]);

    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;

        if (target.className === 'group__button') {
            const name = target.dataset.group as keyof typeof emojiesList;
            const list = emojiesList[name];
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
                    <button className='group__button' key={groupName} data-group={groupName}>
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
