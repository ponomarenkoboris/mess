import { FC } from 'react';
import lady from '@assets/users/lady.png';
import './Settings.scss';

export const Settings: FC = () => {
    return (
        <main className='settings__page'>
            <article className='public__info'>
                <h1>Profile</h1>
                <div className='user-main-info'>
                    <img src={lady} alt='Profile' />
                    <div className='info'>
                        <p>Amilia Luna</p>
                        <p>a-luna@gmail.com</p>
                        <p>@amilia_lus</p>
                    </div>
                </div>
            </article>
            <article className='password__info'></article>
        </main>
    );
};
