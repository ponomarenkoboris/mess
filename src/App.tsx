import { FC } from 'react'
import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router-dom'
import { ChatContextProvider } from '@context/ChatContext'
import { Layout } from './layout/Layout'
import { Chat } from './pages/chat/Chat'
import { SignIn } from './pages/signin/SignIn'
import { SignUp } from './pages/signup/SignUp'

export const App: FC = () => {
    const router = createBrowserRouter([
        {
            path: '/chat',
            element: <Layout><Outlet /></Layout>,
            children: [
                {
                    path: ':chatId',
                    element: <ChatContextProvider><Chat /></ChatContextProvider>
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
