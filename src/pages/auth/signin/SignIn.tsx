import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '@store/api/userApi';
import '../index.scss';

export const SignIn: FC = () => {
    const navigate = useNavigate();
    const [loginUser] = useLoginUserMutation();

    const submitHandler = async (event: FormEvent) => {
        event.preventDefault();
        const { email, password } = event.target as HTMLFormElement;
        try {
            const response = await loginUser({ email: email.value, password: password.value }).unwrap();
            console.log(response);
            navigate('/chat/general');
        } catch {
            console.error('something went wrong');
        }
    };

    return (
        <main className='sign-in'>
            <h1>Sign in</h1>
            <p>Sign in and start using this app</p>
            <form className='sign-in__form' onSubmit={submitHandler}>
                <input type='email' name='email' placeholder='Login' defaultValue='a-luna@gmail.com' />
                <input type='password' name='password' placeholder='Password' defaultValue='123' />
                <div className='form__actions'>
                    <div className='action__remember'>
                        <input type='checkbox' id='remember' />
                        <label htmlFor='remember'>Remember me</label>
                    </div>
                    <p className='action__forgot-pass'>Forgot password?</p>
                </div>
                <button className='form__submit-btn'>Login</button>
            </form>
        </main>
    );
};
