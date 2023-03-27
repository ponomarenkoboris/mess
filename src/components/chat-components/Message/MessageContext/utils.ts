import { Message } from "@models/chat.model"

type ContextMessage = Message & { username: string }
type ContextSettings = { isOpen: boolean, axisX: number, axisY: number }
type ContextModal = { isOpen: boolean }

export interface ContextState {
    message: ContextMessage,
    settings: ContextSettings,
    modal: ContextModal
}

enum ActionTypes {
    DISPLAY_SETTINGS = 'DISPLAY_SETTINGS',
    HIDE_SETTINGS = 'HIDE_SETTINGS',
    CHANGE_TEXT_MESSAGE = 'CHANGE_TEXT_MESSAGE',
    RESET_CONTEXT = 'RESET_CONTEXT'
}

export type Action = { type: ActionTypes.DISPLAY_SETTINGS, payload: ContextState } 
    | { type: ActionTypes.HIDE_SETTINGS }
    | { type: ActionTypes.CHANGE_TEXT_MESSAGE }
    | { type: ActionTypes.RESET_CONTEXT }

const defaultContext: ContextState = {
    message: {} as ContextMessage,
    settings: {
        isOpen: false,
        axisX: 0,
        axisY: 0
    },
    modal: {
        isOpen: false
    }
}

const reducer = (state: ContextState, action: Action): ContextState => {
    switch (action.type) {
        case ActionTypes.DISPLAY_SETTINGS:
            return action.payload
        case ActionTypes.CHANGE_TEXT_MESSAGE:
            return { ...state, modal: { isOpen: !state.modal.isOpen }}
        case ActionTypes.HIDE_SETTINGS:
            return { ...state, settings: defaultContext.settings }
        case ActionTypes.RESET_CONTEXT:
            return defaultContext
        default:
            return state
    }
}

export {
    reducer,
    defaultContext,
    ActionTypes
}