import { FC, useState } from 'react'
import placeholderPhoto from '@assets/users/lady.png'
import linkedIn from '@assets/social_midia/linked_in.svg'
import facebook from '@assets/social_midia/facebook.svg'
import twitter from '@assets/social_midia/twitter.svg'
import instagram from '@assets/social_midia/instagram.svg'
import arrow from '@assets/right_sidebar/arrow.svg'
import rectangle from '@assets/right_sidebar/rectangle.svg'
import './rightSidebar.scss'


export const RightSidebar: FC = () => {
    const [isInteractionMenu, setInteractionMenu] = useState<boolean>(false)
    const [isSidebar, setIsSidebar] = useState<boolean>(true)


    return (
        <div className={`right-sidebar`}>
            <img src={placeholderPhoto} className="user-avatar" alt="User avatar" />
            <div className={`sidebar__menu `}>
                <div className="user-main-info">
                    <div className='user-main-info__name'>
                        <p>Amilia Luna</p>
                        <div className="user-main-info__status"></div>
                    </div>
                    <p className='user-main-info__position'>UI Designer</p>
                </div>
                <div className='user-social-links'>
                    <div className='user-social-link__wrapper'>
                        <img src={facebook} alt="Facebook" />
                    </div>
                    <div className='user-social-link__wrapper'>
                        <img src={twitter} alt="Twitter" />
                    </div>
                    <div className='user-social-link__wrapper'>
                        <img src={instagram} alt="Instagram" />
                    </div>
                    <div className='user-social-link__wrapper'>
                        <img src={linkedIn} alt="Linked in" />
                    </div>
                </div>
                <div className='user-interaction'>
                    <div className='interaction__buttons'>
                        <button className='interaction__btn'>Message</button>
                        <button 
                            className='interaction__toggle-btn'
                            onClick={() => setInteractionMenu(!isInteractionMenu)}
                        >
                                <img src={rectangle} alt="Toggle interaction menu" />
                        </button>
                    </div>                        
                    {isInteractionMenu && <ul className='interaction__list'>
                        <li>a</li>
                        <li>b</li>
                        <li>c</li>
                    </ul>}
                </div>
                <div className='user-info'>
                    <div className="user-info__username">
                        <p className='username__type'>Username</p>
                        <p className='username'>@amilia_lu</p>
                    </div>
                    <div className="user-info__email">
                        <p className='email__type'>Email</p>
                        <p className='email'>a-luna@gmail.com</p>
                    </div>
                    <div className="user-info__skype">
                        <p className='skype__type'>Skype</p>
                        <p className='skype'>amiluna</p>
                    </div>
                    <div className="user-info__timezone">
                        <p className='timezone__type'>Timezone</p>
                        <p className='timezone'>2:21 PM Local time</p>
                    </div>
                </div>
            </div>
            <button className='sidebar-open__button' onClick={() => setIsSidebar(!isSidebar)}>
                <img src={arrow} alt="Open/close info" />
            </button>
        </div>
    )
}
