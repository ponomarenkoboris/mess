import { FC, ReactNode, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { changeHTMLTitle } from '@utils/utils';
import bottom from '@assets/registartion/bottom.svg';
import './GreenLayout.scss';

interface RegistartionLayoutProps {
    children: ReactNode;
}

export const GreenLayout: FC<RegistartionLayoutProps> = ({ children }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const clickHandler = () => {
        pathname === '/sign-in' ? navigate('/sign-up') : pathname === '/settings' ? navigate(-1) : navigate('/sign-in');
    };

    useLayoutEffect(() => {
        if (pathname === '/') navigate('/sign-in');
        changeHTMLTitle(pathname === '/sign-in' ? 'Sign In' : pathname === '/settings' ? 'Settings' : 'Sign Up');
    }, [pathname, navigate]);

    return (
        <div className='registration'>
            <div className='registration__navigation-button'>
                <button onClick={clickHandler} className='navigation-button'>
                    {pathname === '/sign-in' && 'Not register yet? Go ahead!'}
                    {pathname === '/sign-up' && 'Go to login page.'}
                    {pathname === '/settings' && 'Go back.'}
                </button>
            </div>
            {children}
            <img src={bottom} className='registration__page-bottom' alt='' />
        </div>
    );
};
