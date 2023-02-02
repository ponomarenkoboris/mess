import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import group1 from '@assets/groups_images/1.png';
import group2 from '@assets/groups_images/2.png';
import group3 from '@assets/groups_images/3.png';
import group4 from '@assets/groups_images/4.png';
import group5 from '@assets/groups_images/5.png';
import group6 from '@assets/groups_images/6.png';
import group7 from '@assets/groups_images/7.png';
import avatar from '@assets/left_sidebar/avatar.png';
import appendIcon from '@assets/groups_images/append.svg';
import gear from '@assets/left_sidebar/gear.svg';
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
                <div className='group-name'>
                    <p>Nomad List</p>
                    <NavLink to={'/settings'} className='settings-link'>
                        <img src={gear} alt='Settings' />
                    </NavLink>
                </div>
                <div className='group-channels'>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/general'>
                        # general
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/support'>
                        # support
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/marketing'>
                        # marketing
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/thailand'>
                        # thailand
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/bali'>
                        # bali
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/poland'>
                        # poland
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/australia'>
                        # australia
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/jobs'>
                        # jobs
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/startups'>
                        # startups
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/italy'>
                        # italy
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'channel-name active-channel' : 'channel-name')} to='/chat/freelance'>
                        # freelance
                    </NavLink>
                </div>
                <div className='group-freinds'>
                    <div className='block-title'>
                        <p>FRIENDS</p>
                        <p>82</p>
                    </div>
                    <div className='friends-list'>
                        <div className='friend'>
                            <div className='active-status'></div>
                            <img src={avatar} alt='Orlando Diggs' className='avatar' />
                            <div className='name'>Orlando Diggs</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
