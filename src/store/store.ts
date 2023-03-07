import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/user';
import chatReducer from './chat/chat';
import userApi from './api/userApi';

const store = configureStore({
    reducer: {
        user: userReducer,
        chats: chatReducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
