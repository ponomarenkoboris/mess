import { Message } from "@models/chat.model"

type ContextMessage = Message & { username: string }
type ContextSettings = { isOpen: boolean, axisX: number, axisY: number }

export interface ContextState {
    message: ContextMessage,
    settings: ContextSettings
}

enum ActionTypes {
    DISPLAY_SETTINGS = 'DISPLAY_SETTINGS',
    HIDE_SETTINGS = 'HIDE_SETTINGS'
}

type Action = { type: ActionTypes.DISPLAY_SETTINGS | ActionTypes.HIDE_SETTINGS , payload: ContextState }

const defaultContext: ContextState = {
    message: {} as ContextMessage,
    settings: {
        isOpen: false,
        axisX: 0,
        axisY: 0
    }
}

const reducer = (state: ContextState, action: Action): ContextState => {
    switch (action.type) {
        case ActionTypes.DISPLAY_SETTINGS:
            return action.payload
        case ActionTypes.HIDE_SETTINGS:
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