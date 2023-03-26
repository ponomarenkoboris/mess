import { createContext, ReactNode, FC, useReducer } from "react"
import { MessageSettings } from "../MessageSettings/MessageSettings"
import { ContextState, defaultContext, reducer } from "./utils"

export const MessageContext = createContext({} as ContextState)

interface ContextProviderProps {
    children: ReactNode
}

export const MessageContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [context, dispatch] = useReducer(reducer, defaultContext)
    return (
        <MessageContext.Provider value={''}>
            {children}
            <MessageSettings />
        </MessageContext.Provider>
    )
}