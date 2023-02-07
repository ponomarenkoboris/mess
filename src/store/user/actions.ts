import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/user.model';

const updateUserData = (state: IUser, action: PayloadAction<IUser>): void => {
    state = { ...state, ...action.payload };
};

const userActions = { updateUserData };

export default userActions;
