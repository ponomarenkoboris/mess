import { FC, FormEvent } from 'react';
import './SignUp.scss';

export const SignUp: FC = () => {
    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className='sign-up'>
            <h1>Sign up</h1>
            <form className='sign-up__form' onSubmit={submitHandler}>
                <label htmlFor='name'>
                    <p>Enter your name:</p>
                    <input type='text' id='name' placeholder='Name' />
                </label>
                <label htmlFor='sername'>
                    <p>Enter your sername:</p>
                    <input type='text' id='sername' placeholder='Sername' />
                </label>
                <label htmlFor='username'>
                    <p>Think about your username:</p>
                    <input type='text' id='username' placeholder='Username' />
                </label>
                <label htmlFor='email'>
                    <p>Enter email:</p>
                    <input type='email' id='email' placeholder='Email' />
                </label>
                <label htmlFor='password'>
                    <p>Create password:</p>
                    <input type='password' id='password' placeholder='Password' />
                </label>
                <button className='form__submit-btn'>Register</button>
            </form>
        </div>
    );
};
