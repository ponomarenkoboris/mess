import { IUser } from './user.model';

export type LoginUserData = { email: Pick<IUser, 'email'>; password: string };

export type RegisterUserData = Omit<IUser, 'friends' | 'channels' | 'groups'>;

export type UpdateUserData = Partial<IUser>;

export type DeleteUserData = { id: Pick<IUser, 'id'>; password: string };
