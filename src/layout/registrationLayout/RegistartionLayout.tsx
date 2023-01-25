import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeHTMLTitle } from '@utils/utils';
import bottom from '@assets/registartion/bottom.svg';
import './RegistartionLayout.scss';

interface RegistartionLayoutProps {
    children: ReactNode;
}

export const RegistartionLayout: FC<RegistartionLayoutProps> = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (pathname === '/') navigate('/sign-in')
        changeHTMLTitle(pathname === '/sign-in' ? 'Sign In' : 'Sign Up');
    }, [pathname, navigate]);

    return (
        <div className='registration'>
            {children}
            <img src={bottom} className='registration__page-bottom' alt='' />
        </div>
    );
};
