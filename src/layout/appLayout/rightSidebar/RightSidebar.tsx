import { FC, useState } from 'react';
import { useAppSelector } from '@hooks/storeHooks/storeHooks';
import linkedIn from '@assets/social_midia/linked_in.svg';
import facebook from '@assets/social_midia/facebook.svg';
import twitter from '@assets/social_midia/twitter.svg';
import instagram from '@assets/social_midia/instagram.svg';
import arrow from '@assets/right_sidebar/arrow.svg';
import rectangle from '@assets/right_sidebar/rectangle.svg';
import './RightSidebar.scss';

export const RightSidebar: FC = () => {
    const [isInteractionMenu, setInteractionMenu] = useState<boolean>(false);
    const [isSidebar, setIsSidebar] = useState<boolean>(true);
    const user = useAppSelector((state) => state.user);

    return (
        <div className={isSidebar ? 'right-sidebar' : 'small'}>
            <img src={user.imageSrc} className='user-avatar' alt='User avatar' />
            <div className={`sidebar__menu `}>
                <div className='user-main-info'>
                    <div className='user-main-info__name'>
                        <p>{user.name}</p>
                        <div className='user-main-info__status'></div>
                    </div>
                    <p className='user-main-info__position'>{user.position}</p>
                </div>
                <div className='user-social-links'>
                    <div className='user-social-link__wrapper'>
                        <img src={facebook} alt='Facebook' />
                    </div>
                    <div className='user-social-link__wrapper'>
                        <img src={twitter} alt='Twitter' />
                    </div>
                    <div className='user-social-link__wrapper'>
                        <img src={instagram} alt='Instagram' />
                    </div>
                    <div className='user-social-link__wrapper'>
                        <img src={linkedIn} alt='Linked in' />
                    </div>
                </div>
                <div className='user-interaction'>
                    <div className='interaction__buttons'>
                        <button className='interaction__btn'>Message</button>
                        <button
                            className='interaction__toggle-btn'
                            onClick={() => setInteractionMenu(!isInteractionMenu)}
                            onBlur={() => setInteractionMenu(false)}
                        >
                            <img src={rectangle} alt='Toggle interaction menu' />
                        </button>
                    </div>
                    {isInteractionMenu && (
                        <ul className='interaction__list'>
                            <li>a</li>
                            <li>b</li>
                            <li>c</li>
                        </ul>
                    )}
                </div>
                <div className='user-info'>
                    <div className='user-info__username'>
                        <p className='username__type'>Username</p>
                        <p className='username'>{user.username}</p>
                    </div>
                    <div className='user-info__email'>
                        <p className='email__type'>Email</p>
                        <p className='email'>{user.email}</p>
                    </div>
                    <div className='user-info__skype'>
                        <p className='skype__type'>Skype</p>
                        <p className='skype'>{user.skype}</p>
                    </div>
                    <div className='user-info__timezone'>
                        <p className='timezone__type'>Timezone</p>
                        <p className='timezone'>{user.timezone}</p>
                    </div>
                </div>
            </div>
            <button className='sidebar-open__button' onClick={() => setIsSidebar(!isSidebar)}>
                <img src={arrow} alt='Open/close info' />
            </button>
        </div>
    );
};
