import { PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '@models/chat.model';

const appendMessage = (state: Chat[], action: PayloadAction<Message>) => {
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.chatId) {
            state[i].messages.push(action.payload);
            break;
        }
    }
    return state;
};

const deleteMessage = (state: Chat[], action: PayloadAction<Message>) => {
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.chatId) {
            state[i].messages = state[i].messages.filter((message) => message.id !== action.payload.id);
        }
    }
    return state;
};

type UpdateMessagePayload = { id: Message['id'], chatId: Message['chatId'], value: Message['content']['value'] }
const updateMessage = (state: Chat[], action: PayloadAction<UpdateMessagePayload>) => {
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.chatId) {
            state[i].messages.forEach(message => {
                if (message.id === action.payload.id) message.content.value = action.payload.value
            })
            break;
        }
    }
}

const chatActions = { appendMessage, deleteMessage, updateMessage };
export default chatActions;
