import { FC, useState, useReducer, useEffect } from 'react';
import { useAppSelector } from '@hooks/storeHooks/storeHooks';
import { objectsAreEqual } from '@utils/utils';
import { reducer, ActionType, updateProfilePhoto, callClickEvent, tooglePasswordVisibility } from './settings.utils';
import closeEye from '@assets/registration/close_eye.svg'
import './Settings.scss';


export const Settings: FC = () => {
    const { username, email, name, imageSrc } = useAppSelector((store) => store.user);
    const initialState = { username, email, name, imageSrc };
    const [pass, setPass] = useState({ password: '', rePassword: '' })
    const [user, dispatch] = useReducer(reducer, initialState);
    const [isProfileSubmitAvaliable, setIsProfileSubmitAvaliable] = useState<boolean>(false);

    const applayProfileChanges = () => {
        // TODO applay user profile changes
    };

    const applayPasswordChanges = () => {
        // TODO applay user password changes
    };

    useEffect(() => {
        if (!objectsAreEqual(initialState, user)) setIsProfileSubmitAvaliable(true);
        else setIsProfileSubmitAvaliable(false);
    }, [user]);
 
    return (
        <main className='settings__page'>
            <article className='public__info'>
                <h1>Profile</h1>
                <div className='user-main-info'>
                    <div className="photo__uploader">
                        <input type="file" accept='.jpg, .jpeg, .png' onChange={updateProfilePhoto(dispatch)} />
                        <button className="photo__uploader" onClick={callClickEvent}>
                            <img src={user.imageSrc} alt='Profile' />
                        </button>
                    </div>
                    <div className='info'>
                        <div className="info__name">
                            <p>Name: </p>
                            <label className='name'>
                                <input
                                    type='text'
                                    onChange={(e) => dispatch({ type: ActionType.UPDATE_NAME, payload: e.target.value })}
                                    defaultValue={user.name}
                                />
                                <div className='writeble-element-indicator'></div>
                            </label>
                        </div>
                        <div className="info__email">
                            <p>Email: </p>
                            <label className='email'>
                                <input
                                    type='text'
                                    onChange={(e) => dispatch({ type: ActionType.UPDATE_EMAIL, payload: e.target.value })}
                                    defaultValue={user.email}
                                />
                                <div className='writeble-element-indicator'></div>
                            </label>
                        </div>
                        <div className="info__username">
                            <p>Username: </p>
                            <label className='username'>
                                <input
                                    type='text'
                                    onChange={(e) => dispatch({ type: ActionType.UPDATE_USERNAME, payload: e.target.value })}
                                    defaultValue={user.username}
                                />
                                <div className='writeble-element-indicator'></div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='submit-profile'>
                    <button 
                        className='submit-profile-changes' 
                        style={{ visibility: isProfileSubmitAvaliable ? 'visible' : 'hidden' }}
                        onClick={applayProfileChanges}
                    >
                        Confirm profile changes
                    </button>
                </div>
            </article>
            <article className='password__info'>
                <h1>Password</h1>
                <div className="password__form">
                    <div className="password">
                        <input 
                            type="password" 
                            placeholder='Input new password' 
                            onChange={(e) => setPass(prev => ({ ...prev, password: e.target.value }))} 
                        />
                        <button className="visibility-contorller" onClick={tooglePasswordVisibility}>
                            <img src={closeEye} alt="See password" />
                        </button>
                    </div>
                    <div className="rePassword">
                        <input 
                            type="password" 
                            placeholder='Confirm password' 
                            onChange={(e) => setPass(perv => ({ ...perv, rePassword: e.target.value }))} 
                        />
                        <button className="visibility-contorller" onClick={tooglePasswordVisibility}>
                            <img src={closeEye} alt="See password" />
                        </button>
                    </div>
                </div>
                <div className="submit-password">
                    <button 
                        className='submit-password-changes' 
                        style={{ visibility: pass.password && pass.rePassword && pass.password === pass.rePassword ? 'visible' : 'hidden' }} 
                        onClick={applayPasswordChanges}>
                            Confirm password
                    </button>
                </div>
            </article>
        </main>
    );
};
