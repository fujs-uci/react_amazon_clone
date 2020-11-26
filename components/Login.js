import React, { useState } from 'react';
import '../styles/login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase.js';

function Login() {

    const history = useHistory(); // change URL 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        // firebase login authentiation

        auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/');
            })
            .catch(err => alert(err.message));
    };

    const register = e => {
        e.preventDefault();
        // firebase register account

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(auth);
                if (auth) {
                    history.push('/');
                }
            })
            .catch(err => alert(err.message));
    };

    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG6.png"
                    alt="Amazon"/>
            </Link>

            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>

                    <button 
                        className="login__signInButton"
                        type="submit"
                        onClick={signIn}>
                        Sign In
                    </button>
                </form>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Nunc dictum interdum elit eget malesuada. 
                    Nullam eu cursus nunc. 
                    Donec rhoncus lectus nec augue ornare rhoncus. 
                    Morbi cursus accumsan egestas. 
                    Duis lorem augue, mollis eget eleifend vel, venenatis ac urna.
                </p>

                <button 
                    onClick={register}
                    className="login__registerButton">
                    Create new Account
                </button>
            </div>
        </div>
    )
}

export default Login;
