import { useReducer, createContext, ReactNode, Dispatch, FC } from 'react'

export type MessageType = File | string
export type ActionCreator = { type: ActionType, payload?: MessageType }
type ChatContextType = [
    MessageType,
    Dispatch<ActionCreator>
]

const initialState: ChatContextType = ['', () => {}]
const ChatInputContext = createContext<ChatContextType>(initialState)

enum ActionType {
    DOCUMENT = 'DOCUMENT',
    VOICE = 'VOICE',
    TEXT = 'TEXT',
    RESET = 'RESET'
}

const reducer = (state: MessageType, action: ActionCreator) => {
    switch(action.type) {
        case ActionType.TEXT:
            return action.payload as string
        case ActionType.DOCUMENT:
            return action.payload as File
        // case ActionType.VOICE:
            // return action.payload as string
        case ActionType.RESET:
            return ''
        default: 
            return state
    }
}

type ChatContextProviderProps = { children: ReactNode }
const ChatContextProvider: FC<ChatContextProviderProps> = ({ children }) => {
    const [value, dispatch] = useReducer(reducer, '')

    return <ChatInputContext.Provider value={[value, dispatch]}>{children}</ChatInputContext.Provider>
}

export {
    ChatContextProvider,
    ActionType,
    ChatInputContext,
}