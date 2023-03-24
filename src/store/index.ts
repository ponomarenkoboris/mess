import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userReducer';
import chatReducer from './chat/chatReducer';
import userApi from './user/api/userApi';

const rootReducer = combineReducers({
    userReducer,
    chatReducer,
    [userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
