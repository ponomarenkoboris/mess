import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginUserData, RegisterUserData, UpdateUserData, DeleteUserData } from '../models/userApi.model';
import { IUser } from '../models/user.model';

const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<IUser, LoginUserData>({
            query: (loginData) => ({
                url: '/sign-in',
                method: 'POST',
                body: loginData,
            }),
        }),
        registerUser: builder.mutation<IUser, RegisterUserData>({
            query: (rigisterData) => ({
                url: '/sign-up',
                method: 'POST',
                body: rigisterData,
            }),
        }),
        updateUser: builder.mutation<IUser, UpdateUserData>({
            query: (rigisterData) => ({
                url: '/sign-up',
                method: 'PUT',
                body: rigisterData,
            }),
        }),
        deleteUser: builder.mutation<IUser, DeleteUserData>({
            query: (rigisterData) => ({
                url: '/sign-up',
                method: 'DELETE',
                body: rigisterData,
            }),
        }),
    }),
});

export default registerApi;
export const { useLoginUserMutation } = registerApi;
