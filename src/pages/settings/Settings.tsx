import { FC, useReducer, useEffect, useState } from 'react';
import { useAppSelector } from '@hooks/storeHooks/storeHooks';
import { objectsAreEqual } from '@utils/utils';
import { reducer, ActionType } from './settings.utils';
import lady from '@assets/users/lady.png';
import './Settings.scss';

export const Settings: FC = () => {
    const { username, email, name } = useAppSelector((store) => store.user);
    const initialState = { username, email, name };
    const [user, dispatch] = useReducer(reducer, initialState);
    const [isSubmitAvaliable, setIsSubmitAvaliable] = useState<boolean>(false);

    const applayChanges = () => {
        // TODO applay user profile changes
    };

    useEffect(() => {
        if (!objectsAreEqual(initialState, user)) setIsSubmitAvaliable(true);
        else setIsSubmitAvaliable(false);
    }, [user]);

    return (
        <main className='settings__page'>
            <article className='public__info'>
                <h1>Profile</h1>
                <div className='user-main-info'>
                    <img src={lady} alt='Profile' />
                    <div className='info'>
                        <label className='name-info'>
                            <input
                                type='text'
                                onChange={(e) => dispatch({ type: ActionType.UPDATE_NAME, payload: e.target.value })}
                                defaultValue={user.name}
                            />
                            <div className='writeble-element-indicator'></div>
                        </label>
                        <label className='email-info'>
                            <input
                                type='text'
                                onChange={(e) => dispatch({ type: ActionType.UPDATE_EMAIL, payload: e.target.value })}
                                defaultValue={user.email}
                            />
                            <div className='writeble-element-indicator'></div>
                        </label>
                        <label className='username-info'>
                            <input
                                type='text'
                                onChange={(e) => dispatch({ type: ActionType.UPDATE_USERNAME, payload: e.target.value })}
                                defaultValue={user.username}
                            />
                            <div className='writeble-element-indicator'></div>
                        </label>
                    </div>
                </div>
                <div className='submit-wrapper'>
                    <button className='submit-changes' style={{ visibility: isSubmitAvaliable ? 'visible' : 'hidden' }} onClick={applayChanges}>
                        Submit
                    </button>
                </div>
            </article>
            <article className='password__info'></article>
        </main>
    );
};
