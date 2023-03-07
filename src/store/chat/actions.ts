import { PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "@store/models/chat.model";

const appendMessage = (state: Chat[], action: PayloadAction<Message>) => {
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.chatId) {
            state[i].messages.push(action.payload)
            break;
        }
    }
    return state
}

const deleteMessage = (state: Chat[], action: PayloadAction<Message>) => {
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.chatId) {
            state[i].messages = state[i].messages.filter(message => message.id !== action.payload.id)
        }
    }
    return state
}

const chatActions = { appendMessage, deleteMessage }
export default chatActions