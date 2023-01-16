import { FC } from 'react'
import { Layout } from './layout/Layout'
import { Chat } from './pages/chat/Chat'
import { SignIn } from './pages/signin/SignIn'
import { SignUp } from './pages/signup/SignUp'
import { RouterProvider, createBrowserRouter, Outlet, Navigate, useLocation } from 'react-router-dom'

export const App: FC = () => {
    const router = createBrowserRouter([
        {
            path: '/chat',
            element: <Layout><Outlet /></Layout>,
            children: [
                {
                    path: ':chatId',
                    element: <Chat />
                },
                {
                    path: '/chat/text',
                    element: <h1>text</h1>
                }
            ]
        },
        {
            path: '/sign-in',
            element: <SignIn />
        },
        {
            path: '/sign-up',
            element: <SignUp />
        },
        {
            path: '*',
            element: <Navigate to="/sign-in" />
        }
        
    ])

    return <RouterProvider router={router} />
}
