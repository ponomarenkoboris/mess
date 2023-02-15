import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/user.model';

const updateUserData = (state: IUser, action: PayloadAction<Partial<IUser>>): IUser => {
    state = { ...state, ...action.payload };
    return state;
};

const userActions = { updateUserData };

export default userActions;
