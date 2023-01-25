import { FC } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import { ChatContextProvider } from '@context/ChatContext';
import { AppLayout, RegistartionLayout } from '@layout/index';
import { Chat } from './pages/chat/Chat';
import { SignIn } from './pages/signin/SignIn';
import { SignUp } from './pages/signup/SignUp';

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
                        <ChatContextProvider>
                            <Chat />
                        </ChatContextProvider>
                    ),
                },
            ],
        },
        {
            path: '/',
            element: (
                <RegistartionLayout>
                    <Outlet />
                </RegistartionLayout>
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
            ],
        },
        {
            path: '*',
            element: <Navigate to='/sign-in' />,
        },
    ]);

    return <RouterProvider router={router} />;
};
