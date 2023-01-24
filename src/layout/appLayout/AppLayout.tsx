import { FC, ReactNode, useEffect } from 'react'
import { Header } from './header/Header'
import { RightSidebar } from './rightSidebar/RightSidebar'
import { LeftSidebar } from './leftSidebar/LeftSidebar'
import { changeHTMLTitle } from '@utils/utils'
import { useLocation } from 'react-router-dom'
import './layout.scss'

interface ILayoutProps {
    children: ReactNode
}

export const AppLayout: FC<ILayoutProps> = ({ children }) => {
    const { pathname } = useLocation()

    useEffect(() => {
        let title: string = pathname.split('/')[1]
        title = title.charAt(0).toUpperCase() + title.substring(1)
        changeHTMLTitle(title)
    }, [pathname])

    return (
        <div className='layout'>
            <LeftSidebar />
                <div className={`layout__main`}>
                    <Header />
                    {children}
                </div>
            <RightSidebar />
        </div>
    )
}
