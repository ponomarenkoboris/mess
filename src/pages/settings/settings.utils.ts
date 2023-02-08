import { IUser } from '@store/models/user.model';

type User = Pick<IUser, 'username' | 'email' | 'name'>;

enum ActionType {
    UPDATE_USERNAME = 'UPDATE_USERNAME',
    UPDATE_EMAIL = 'UPDATE_EMAIL',
    UPDATE_NAME = 'UPDATE_NAME',
}

type Action = {
    type: ActionType;
    payload: string;
};

const reducer = (state: User, action: Action): User => {
    switch (action.type) {
        case ActionType.UPDATE_USERNAME:
            return { ...state, username: action.payload };
        case ActionType.UPDATE_EMAIL:
            return { ...state, email: action.payload };
        case ActionType.UPDATE_NAME:
            return { ...state, name: action.payload };
        default:
            return state;
    }
};

export { reducer, ActionType };
