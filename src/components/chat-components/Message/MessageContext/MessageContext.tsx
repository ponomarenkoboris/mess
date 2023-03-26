import { createContext, ReactNode, FC, useReducer, Dispatch } from "react"
import { ContextState, defaultContext, reducer, Action } from "./utils"
import { MessageSettings } from "../MessageSettings/MessageSettings"

type MessageContextType = ContextState & { dispatch: Dispatch<Action> }

export const MessageContext = createContext({} as MessageContextType)

interface ContextProviderProps {
    children: ReactNode
}

export const MessageContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [{ message, settings }, dispatch] = useReducer(reducer, defaultContext)
    return (
        <MessageContext.Provider value={{ message, settings, dispatch }}>
            {children}
            <MessageSettings />
        </MessageContext.Provider>
    )
}