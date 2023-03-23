import { createSlice } from '@reduxjs/toolkit';
import { Chat } from '@models/chat.model';
import chatActions from './actions';

const initialState: Chat[] = [
    {
        id: 1,
        name: 'general',
        members: ['@amilia_lu'],
        messages: [
            {
                id: 1,
                owner: 'amilia_lu',
                content: {
                    type: 'text',
                    value: 'Hello world',
                },
                sendDate: new Date().toLocaleDateString(),
                chatId: 1,
            },
            {
                id: 2,
                owner: 'boris',
                content: {
                    type: 'text',
                    value: 'world hello',
                },
                sendDate: new Date().toLocaleDateString(),
                chatId: 1,
            },
        ],
    },
];

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        ...chatActions,
    },
});

export const { appendMessage, deleteMessage } = chatSlice.actions;
export default chatSlice.reducer;
