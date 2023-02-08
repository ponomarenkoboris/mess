import { createSlice } from '@reduxjs/toolkit';
import userActions from './actions';
import placeholderPhoto from '@assets/users/lady.png';
import { IUser } from '../models/user.model';

const initialState: IUser = {
    id: 1,
    name: 'Amilia Luna',
    position: 'UI Designer',
    imageSrc: placeholderPhoto,
    username: 'amilia_lu',
    email: 'a-luna@gmail.com',
    skype: 'amiluna',
    timezone: '2:21 PM Local time',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        ...userActions,
    },
});

export default userSlice.reducer;
