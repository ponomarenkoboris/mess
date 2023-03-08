import { FC } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { AppLayout, GreenLayout } from '@layout/index';
import { Chat } from './pages/chat/Chat';
import { SignIn, SignUp } from './pages/auth';
import { Settings } from './pages/settings/Settings';

export const App: FC = () => {
    const router = createBrowserRouter([
        {
            path: '/chat',
            element: (
                <AppLayout>
                    <Outlet />
                </AppLayout>
            ),
            children: [
                {
                    path: ':chatId',
                    element: (
                        <Chat />
                    ),
                },
            ],
        },
        {
            path: '/',
            element: (
                <GreenLayout>
                    <Outlet />
                </GreenLayout>
            ),
            children: [
                {
                    path: '/sign-in',
                    element: <SignIn />,
                },
                {
                    path: '/sign-up',
                    element: <SignUp />,
                },
                {
                    path: '/settings',
                    element: <Settings />,
                },
            ],
        },
        {
            path: '*',
            element: <Navigate to='/sign-in' />,
        },
    ]);

    return <RouterProvider router={router} />;
};
