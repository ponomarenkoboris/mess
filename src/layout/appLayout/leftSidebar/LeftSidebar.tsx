import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import './leftSidebar.scss'

export const LeftSidebar: FC = () => {
    

    return (
        <div className={`left-sidebar`}>
            <div className='left-sidebar__groups-bar'>
                Groups
            </div>
            <div className={`left-sidebar__chats-bar`}>
                <NavLink to={'/chat/general'}>General</NavLink>
                <NavLink to={'/chat/MyCompany'}>dhdhffff</NavLink>
            </div>
        </div>
    )
}
