import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase';

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                navigate('/')
            })
            .catch(error => alert(error.message))


    }
    const register = (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
                if (auth) {
                    navigate('/')
                }
            })
            .catch(error => alert(error.message))

    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className='login__logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'></img>

            </Link>
            <div className='login__container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}></input>

                    <h5>password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                    <button type='submit' className='login__signInButton' onClick={signIn}>Sign In</button>

                </form>
                <p>
                    By signing in you agree to amazons terms
                    and conditions of use and sale, Please
                    see our privacy Notice , our cookies notice.
                </p>
                <button className='login__registerButton' onClick={register}>create your amazon account</button>

            </div>

        </div>
    )
}

export default Login
