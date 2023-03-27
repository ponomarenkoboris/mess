import { createContext, ReactNode, FC, useReducer, Dispatch } from "react"
import { ContextState, defaultContext, reducer, Action, ActionTypes } from "./utils"
import { MessageSettings } from "../MessageSettings/MessageSettings"
import useChatActions from "@hooks/useChatActions"
import { Modal } from '../../Modal/Modal'

type MessageContextType = ContextState & { dispatch: Dispatch<Action> }

export const MessageContext = createContext({} as MessageContextType)

interface ContextProviderProps {
    children: ReactNode
}

export const MessageContextProvider: FC<ContextProviderProps> = ({ children }) => {
    const [{ message, settings, modal }, dispatch] = useReducer(reducer, defaultContext)
    const { updateMessage } = useChatActions()

    const closeModal = () => dispatch({ type: ActionTypes.RESET_CONTEXT })

    const onConfirmModal = (value: string) => {
        const newMess = { id: message.id, chatId: message.chatId, value }
        updateMessage(newMess)
        closeModal()
    }

    return (
        <MessageContext.Provider value={{ message, settings, modal, dispatch }}>
            {children}
            <MessageSettings />
            {modal.isOpen && message.content.type === 'text' &&(
                <Modal 
                    type="confirm"
                    title="Change message"
                    textContent={message.content.value as string}
                    onClose={closeModal}
                    onConfirm={onConfirmModal}
                />
            )}
        </MessageContext.Provider>
    )
}