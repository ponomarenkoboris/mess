import { useReducer, createContext, ReactNode, Dispatch, FC } from 'react';
import type { Content } from '../store/models/chat.model'

export type ActionCreator = { type: ActionType; payload?: Content };
type ChatContextType = [Content, Dispatch<ActionCreator>];

const defaultState: Content = { type: 'text', value: '' };
const initialState: ChatContextType = [defaultState, () => {}]; // eslint-disable-line @typescript-eslint/no-empty-function
const ChatInputContext = createContext<ChatContextType>(initialState);

enum ActionType {
    DOCUMENT = 'DOCUMENT',
    VOICE = 'VOICE',
    TEXT = 'TEXT',
    RESET = 'RESET',
}

const reducer = (state: Content, action: ActionCreator): Content => {
    switch (action.type) {
        case ActionType.TEXT:
            const textMessage = action.payload;
            if (!textMessage) return state;
            return { type: textMessage.type, value: textMessage.value };

        case ActionType.DOCUMENT:
            const fileMessage = action.payload;
            if (!fileMessage) return state;
            return { type: fileMessage.type, value: fileMessage.value };

        case ActionType.VOICE:
            const audioMessage = action.payload;
            if (!audioMessage) return state;
            return { type: audioMessage.type, value: audioMessage.value };

        case ActionType.RESET:
            return { type: 'text', value: '' };

        default:
            return state;
    }
};

type ChatContextProviderProps = { children: ReactNode };
const ChatContextProvider: FC<ChatContextProviderProps> = ({ children }) => {
    const [value, dispatch] = useReducer(reducer, defaultState);

    return <ChatInputContext.Provider value={[value, dispatch]}>{children}</ChatInputContext.Provider>;
};

export { ChatContextProvider, ActionType, ChatInputContext, defaultState };
