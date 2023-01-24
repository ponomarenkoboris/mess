import { FC, ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { changeHTMLTitle } from '@utils/utils'
import bottom from '@assets/registartion/bottom.svg'
import './RegistartionLayout.scss'

interface RegistartionLayoutProps {
    children: ReactNode
}

export const RegistartionLayout: FC<RegistartionLayoutProps> = ({ children }) => {
    const { pathname } = useLocation()

    useEffect(() => {
        changeHTMLTitle(pathname === '/sign-in' ? 'Sign In' : 'Sign Up')
    }, [pathname])

    return (
        <div className='registration'>
            {children}
            <img src={bottom} className='registration__page-bottom' />
        </div>
    )
}
