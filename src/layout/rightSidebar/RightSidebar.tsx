import { FC } from 'react'
import './rightSidebar.scss'


export const RightSidebar: FC = () => {
    
    return (
        <div className={`right-sidebar`}>
            <div className={`sidebar__menu `}>
                <p>RightSidebar</p>
            </div>
            <button className='sidebar__open-button'>Open sidebar</button>
        </div>
    )
}
