import { IUser } from '@store/models/user.model';
import { ChangeEvent, Dispatch, MouseEvent } from 'react';
import openEye from '@assets/registration/open_eye.svg';
import closeEye from '@assets/registration/close_eye.svg';

enum ActionType {
    UPDATE_USERNAME = 'UPDATE_USERNAME',
    UPDATE_EMAIL = 'UPDATE_EMAIL',
    UPDATE_NAME = 'UPDATE_NAME',
    UPDATE_IMAGE = 'UPDATE_IMAGE',
}

type Action = {
    type: ActionType;
    payload: string;
};

const reducer = (state: IUser, action: Action): IUser => {
    switch (action.type) {
        case ActionType.UPDATE_USERNAME:
            return { ...state, username: action.payload };
        case ActionType.UPDATE_EMAIL:
            return { ...state, email: action.payload };
        case ActionType.UPDATE_NAME:
            return { ...state, name: action.payload };
        case ActionType.UPDATE_IMAGE:
            return { ...state, imageSrc: action.payload };
        default:
            return state;
    }
};

const updateProfilePhoto = (dispatch: Dispatch<Action>) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.item(0)) return;
        const file = event.target.files.item(0);
        if (!file) return;

        const reader = new FileReader();

        reader.addEventListener('load', () => {
            const result = reader.result as string;
            dispatch({ type: ActionType.UPDATE_IMAGE, payload: result });
        });

        reader.readAsDataURL(file);
    };
};

const callClickEvent = (event: MouseEvent<HTMLButtonElement>) => {
    const parent = event.currentTarget.parentNode as ParentNode;
    const fileElem = parent.querySelector('[type="file"]') as HTMLInputElement;
    fileElem.click();
};

const tooglePasswordVisibility = (event: MouseEvent<HTMLButtonElement>) => {
    const passwordInput = event.currentTarget?.parentNode?.querySelector('input');
    const image = event.currentTarget.querySelector('img');
    if (!passwordInput || !image) return;
    passwordInput.type = passwordInput.type === 'text' ? 'password' : 'text';
    image.src = passwordInput.type === 'text' ? openEye : closeEye;
};

export { reducer, ActionType, updateProfilePhoto, callClickEvent, tooglePasswordVisibility };
