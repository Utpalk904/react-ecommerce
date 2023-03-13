import React from 'react';
import { Link } from 'react-router-dom';
import BreadCrums from '../components/BreadCrums';
import InputField from '../components/InputField';
import PageHeader from '../components/PageHeader';
import '../css/Login.css';

const Login = () => {
  return (
    <div className='login-page'>
        <PageHeader pageHeader='Customer Login'/>
        <BreadCrums address='Login'/>
        <div className="login-register">
            <div className="login-form left">
                <h2>REGISTERED CUSTOMER</h2>
                <h5>If you have an account, sign in with your email address.</h5>
                <form action="#" method="post">
                    <InputField labelFor='email' label='Email' required='*' inputType='email'/>
                    <InputField labelFor='password' label='Password' required='*' inputType='password'/>
                    <div className="submit-forgot">
                        <button type="submit" className='login-reg-button login'>Sign In</button>
                        <Link to='/'>Forgot Your Password?</Link>
                    </div>
                </form>
            </div>
            <div className="register-section right">
                <h2>NEW CUSTOMERS</h2>
                <h5>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</h5>
                <Link to='/register' className='login-reg-button register'>Create an Account</Link>
            </div>
        </div>
        
    </div>
  )
}

export default Login;