export interface EmojiState<T> {
    isShowEmojiSelector: boolean;
    name: string;
    currentEmojies: T;
}

enum ActionTypes {
    SET_NAME = 'SET_NAME',
    SET_CURRENT_EMOJIES = 'SET_CURRENT_EMOJIES',
    IS_SHOW = 'IS_SHOW'
}

type ActionCreator = { type: ActionTypes.SET_NAME, payload: string } 
    | { type: ActionTypes.SET_CURRENT_EMOJIES, payload: unknown }
    | { type: ActionTypes.IS_SHOW, payload: boolean };

const reducer = <T>(state: EmojiState<T>, action: ActionCreator): EmojiState<T> => {
    switch (action.type) {
        case ActionTypes.IS_SHOW:
            return { ...state, isShowEmojiSelector: action.payload }
        case ActionTypes.SET_NAME:
            return { ...state, name: action.payload }
        case ActionTypes.SET_CURRENT_EMOJIES:
            return { ...state, currentEmojies: action.payload as T }
        default:
            return state
    }
}

export {
    reducer,
    ActionTypes
}