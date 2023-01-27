import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import group1 from '@assets/groups_images/1.png';
import group2 from '@assets/groups_images/2.png';
import group3 from '@assets/groups_images/3.png';
import group4 from '@assets/groups_images/4.png';
import group5 from '@assets/groups_images/5.png';
import group6 from '@assets/groups_images/6.png';
import group7 from '@assets/groups_images/7.png';
import appendIcon from '@assets/groups_images/append.svg';
import './LeftSidebar.scss';

export const LeftSidebar: FC = () => {
    const srcArr = [group1, group2, group3, group4, group5, group6, group7];
    return (
        <div className={`left-sidebar`}>
            <div className='left-sidebar__groups-bar'>
                <div className='group-bar__group-list'>
                    {srcArr.map((src) => (
                        <div className='group' key={src}>
                            <img src={src} alt='Group name' />
                        </div>
                    ))}
                </div>
                <button className='group-bar__create-group'>
                    <img src={appendIcon} alt='Create new group' />
                </button>
            </div>
            <div className={`left-sidebar__chats-bar`}>
                <NavLink to={'/chat/general'}>General</NavLink>
                <NavLink to={'/chat/MyCompany'}>dhdhffff</NavLink>
            </div>
        </div>
    );
};
