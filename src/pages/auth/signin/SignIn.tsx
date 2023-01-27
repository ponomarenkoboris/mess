import { FC, FormEvent } from 'react';
import '../index.scss';

export const SignIn: FC = () => {
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className='sign-in'>
            <h1>Sign in</h1>
            <p>Sign in and start using this app</p>
            <form className='sign-in__form' onSubmit={submitHandler}>
                <input type='email' placeholder='Login' />
                <input type='password' placeholder='Password' />
                <div className='form__actions'>
                    <div className='action__remember'>
                        <input type='checkbox' id='remember' />
                        <label htmlFor='remember'>Remember me</label>
                    </div>
                    <p className='action__forgot-pass'>Forgot password?</p>
                </div>
                <button className='form__submit-btn'>Login</button>
            </form>
        </div>
    );
};
