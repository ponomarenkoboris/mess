import { FC } from 'react';
import { useParams } from 'react-router-dom';
import star from '@assets/header/combined_shape_364.svg';
import search from '@assets/header/combined_shape_352.svg';
import human from '@assets/header/combined_shape_363.svg';
import bell from '@assets/header/combined_shape_366.svg';
import more from '@assets/header/more.svg';
import './header.scss';

export const Header: FC = () => {
    const { chatId } = useParams();

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
                        <input type='text' placeholder='Search...' />
                        <img src={search} alt='Search' />
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
