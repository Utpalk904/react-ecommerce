import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import BreadCrums from '../components/BreadCrums';
import InputField from '../components/InputField';
import PageHeader from '../components/PageHeader';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, loginUser } from '../actions/userAction';
import '../css/Login.css';
import Loader2 from '../components/Loader2';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams(window.location.search);

    const { isAuthenticated, error, loading } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append('email', email);
        data.append('password', password);
        try {
            dispatch(loginUser(data));

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(searchParams.get('redirect') || '/');
        }

    }, [dispatch, error, isAuthenticated, navigate, searchParams]);

  return (
    <div className='login-page'>
        {loading && <Loader2/>}
        <PageHeader pageHeader='Customer Login'/>
        <BreadCrums address='Login'/>
        <div className="login-register">
            <div className="login-form left">
                <h2>REGISTERED CUSTOMER</h2>
                <h5>If you have an account, sign in with your email address.</h5>
                <form method="post" onSubmit={submitHandler}>
                    <InputField labelFor='email' label='Email' required='*' onChange={(e) => setEmail(e.target.value)} inputType='email'/>
                    <InputField labelFor='password' label='Password' required='*' onChange={(e) => setPassword(e.target.value)} inputType='password'/>
                    <div className="submit-forgot">
                        <button type="submit" className='login-reg-button login disabled:cursor-not-allowed' disabled={loading} >Sign In</button>
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