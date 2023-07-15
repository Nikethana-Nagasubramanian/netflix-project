import React, { useRef } from 'react'
import auth from '../firebase'
import './SignUpScreen.css'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function SignUpScreen() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const auth = getAuth();
  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
      console.log(authUser);
    }).catch(error => {
      alert(error.message);
    });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword.apply(
      auth, 
      emailRef.current.value,
      passwordRef.current.value
    ).then((authUser) => {
      console.log(authUser);
    }).catch(error => {
      alert(error.message);
    });
  };

  return (
    <div className='signUpScreen'>
      
          <form>
          <h1>Sign In</h1>
              <input ref = {emailRef} type = 'email' placeholder='Email Address'/>
              <input ref = {passwordRef} type = 'password' placeholder='Password'/>
              <button type = 'submit'> Sign In</button>
              <h4>
                <span className='signUp__gray' onClick = {signIn}>New to Netflix? </span>
                <span className='signUp__link' onClick = {register}>Sign Up now.</span></h4>
          </form>
    </div>
  )
}

export default SignUpScreen