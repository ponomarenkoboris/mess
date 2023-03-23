import { FC, MouseEvent, useEffect, useReducer } from 'react';
import type { EmojiState } from './emoji.utils';
import { reducer, ActionTypes } from './emoji.utils';
import './EmojiSelector.scss';
import smile from '@assets/chat_page/smile.svg';
import emojies from './emoji.json';

interface EmojiSelectorProps {
    insertEmoji: (code: string) => void;
}

const groups = Object.keys(emojies);
const emojiGroup = emojies[groups[0] as keyof typeof emojies];

type EmojiGroup = typeof emojiGroup;

const defaultState: EmojiState<EmojiGroup> = {
    name: groups[0],
    isShowEmojiSelector: false,
    currentEmojies: emojiGroup,
};

const listenerCreator = (closeCallback: () => void): ((event: globalThis.MouseEvent) => void) => {
    return (event: globalThis.MouseEvent) => {
        const target = event.target as HTMLElement;
        const isOpenButton = target.classList.contains('user-input_smiles-picture') || target.classList.contains('user-input_smiles');
        if (!target.classList.contains('smiles__list') && !isOpenButton) closeCallback();
    };
};

export const EmojiSelector: FC<EmojiSelectorProps> = ({ insertEmoji }) => {
    const [{ name, isShowEmojiSelector, currentEmojies }, dispatch] = useReducer(reducer<EmojiGroup>, defaultState);
    const toogleEmojiSelector = () => dispatch({ type: ActionTypes.IS_SHOW, payload: !isShowEmojiSelector });
    const listener = listenerCreator(toogleEmojiSelector);

    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;

        if (target.className.match('group__button')) {
            const name = target.dataset.group as keyof typeof emojies;
            const list = emojies[name];
            dispatch({ type: ActionTypes.SET_NAME, payload: name });
            dispatch({ type: ActionTypes.SET_CURRENT_EMOJIES, payload: list });
            return;
        }

        if (target.className === 'emoji') {
            const emoji = target.dataset.emoji as string;
            insertEmoji(emoji);
            toogleEmojiSelector();
        }
    };

    useEffect(() => {
        if (isShowEmojiSelector) {
            document.addEventListener('click', listener);
            return () => document.removeEventListener('click', listener);
        }
    }, [isShowEmojiSelector]);

    return (
        <>
            <button className='user-input_smiles' onClick={toogleEmojiSelector}>
                <img className='user-input_smiles-picture' loading='lazy' src={smile} alt='Smiles' />
            </button>
            {isShowEmojiSelector && (
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
            )}
        </>
    );
};
