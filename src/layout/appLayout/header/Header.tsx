import { ChangeEvent, FC } from 'react';
import { useParams } from 'react-router-dom';
import { debounceCreator } from '@utils/utils';
import star from '@assets/header/combined_shape_364.svg';
import search from '@assets/header/combined_shape_352.svg';
import human from '@assets/header/combined_shape_363.svg';
import bell from '@assets/header/combined_shape_366.svg';
import more from '@assets/header/more.svg';
import './header.scss';

const debounce = debounceCreator();

export const Header: FC = () => {
    const { chatId } = useParams();

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;

    };

    return (
        <header>
            <div className='header'>
                <div className='header__chat-name'>
                    <h1 className='chat-name'>#{chatId}</h1>
                    <img className='favourite-button' src={star} alt='Favourite button' />
                </div>
                <div className='header__chat-interactive-menu'>
                    <div className='chat-interactive-menu__members-count'>
                        <img src={human} alt='Members' />
                        <p>1,093</p>
                    </div>
                    <div className='chat-interactive-menu__search-input'>
                        <input type='text' id='search__input' placeholder='Search...' onChange={(e) => debounce(() => changeHandler(e), 500)} />
                        <label htmlFor="search__input">
                            <img src={search} alt='Search' />
                        </label>
                    </div>
                    <div className='chat-interactive-menu__notifications-button'>
                        <img src={bell} alt='Notifications' />
                        <div className='notifications-button_indicator'></div>
                    </div>
                    <img className='chat-interactive-menu__more-button' src={more} alt='More' />
                </div>
            </div>
        </header>
    );
};
