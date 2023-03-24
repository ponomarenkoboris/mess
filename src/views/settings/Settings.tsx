import { FC, useState, useReducer, useEffect } from 'react';
import { useTypedSelector } from '@hooks/storeHooks/storeHooks';
import useUserActions from '@hooks/UseUserActions';
import { objectsAreEqual } from '@utils/utils';
import { reducer, ActionType, updateProfilePhoto, callClickEvent, tooglePasswordVisibility } from './settings.utils';
import closeEye from '@assets/registration/close_eye.svg';
import './Settings.scss';
import { SocialNetworks } from '@models/user.model';
import { SettingsInput } from '@components/index';

export const Settings: FC = () => {
    const userData = useTypedSelector((store) => store.userReducer);
    const { updateUserData } = useUserActions();
    const initialState = userData;
    const [pass, setPass] = useState({ password: '', rePassword: '' });
    const [user, dispatch] = useReducer(reducer, initialState);
    const [isProfileSubmitAvaliable, setIsProfileSubmitAvaliable] = useState<boolean>(false);

    const applayProfileChanges = () => {
        updateUserData(user);
        setIsProfileSubmitAvaliable(false);
        // TODO applay user profile changes to the server
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
                    <div className='main-info'>
                        <div className='photo__uploader'>
                            <input type='file' accept='.jpg, .jpeg, .png' onChange={updateProfilePhoto(dispatch)} />
                            <button className='photo__uploader' onClick={callClickEvent}>
                                <img src={user.imageSrc} alt='Profile' />
                            </button>
                        </div>
                        <div className='info'>
                            <div className='info__name'>
                                <p>Name: </p>
                                <SettingsInput
                                    labelClassName='name'
                                    onChange={(e) => dispatch({ type: ActionType.UPDATE_NAME, payload: e.target.value })}
                                    defaultValue={user.name}
                                />
                            </div>
                            <div className='info__email'>
                                <p>Email: </p>
                                <SettingsInput
                                    labelClassName='email'
                                    onChange={(e) => dispatch({ type: ActionType.UPDATE_EMAIL, payload: e.target.value })}
                                    defaultValue={user.email}
                                />
                            </div>
                            <div className='info__username'>
                                <p>Username: </p>
                                <SettingsInput
                                    labelClassName='username'
                                    onChange={(e) => dispatch({ type: ActionType.UPDATE_USERNAME, payload: e.target.value })}
                                    defaultValue={user.username}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='socials'>
                        <h2>Social networks</h2>
                        <ul className='social-networks'>
                            {Object.keys(user.socialNetworks).map((networkName) => (
                                <li key={networkName}>
                                    <p>{networkName}</p>
                                    <SettingsInput
                                        labelClassName={networkName}
                                        onChange={(e) => {
                                            console.log('hi', e);
                                        }}
                                        defaultValue={user.socialNetworks[networkName as keyof SocialNetworks] || ''}
                                    />
                                </li>
                            ))}
                        </ul>
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
                <div className='password__form'>
                    <div className='password'>
                        <input
                            type='password'
                            placeholder='Input new password'
                            onChange={(e) => setPass((prev) => ({ ...prev, password: e.target.value }))}
                        />
                        <button className='visibility-contorller' onClick={tooglePasswordVisibility}>
                            <img src={closeEye} alt='See password' />
                        </button>
                    </div>
                    <div className='rePassword'>
                        <input
                            type='password'
                            placeholder='Confirm password'
                            onChange={(e) => setPass((perv) => ({ ...perv, rePassword: e.target.value }))}
                        />
                        <button className='visibility-contorller' onClick={tooglePasswordVisibility}>
                            <img src={closeEye} alt='See password' />
                        </button>
                    </div>
                </div>
                {pass.password === pass.rePassword ? (
                    <div className='submit-password'>
                        <button
                            className='submit-password-changes'
                            style={{ visibility: pass.password && pass.rePassword ? 'visible' : 'hidden' }}
                            onClick={applayPasswordChanges}
                        >
                            Confirm password
                        </button>
                    </div>
                ) : (
                    <div className='alert-message'>
                        <p>Passwords must match</p>
                    </div>
                )}
            </article>
        </main>
    );
};
