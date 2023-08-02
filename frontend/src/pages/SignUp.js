import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadCrums from '../components/BreadCrums';
import { useSelector, useDispatch } from 'react-redux';
import InputField from '../components/InputField';
import PageHeader from '../components/PageHeader';
import '../css/SignUp.css';
import { toast } from 'react-toastify';
import { clearErrors, registerUser } from '../actions/userAction';

const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, isAuthenticated } = useSelector((state) => state.user);

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('name', name);
        data.append('email', email);
        data.append('password', password);

        console.log(data);
        dispatch(registerUser(data));
    }

    useEffect(() => {
        // if (!loading) {
        //     toast.success("success");
        // }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate('/');
        }
    }, [error, dispatch, isAuthenticated, navigate]);

    return (
        <div className='login-page'>
            <PageHeader pageHeader='Create New Account' />
            <BreadCrums address='Create Account' />
            <div className="register-form">
                <h2>SIGN-IN INFORMATION</h2>
                <h5>If you already have an account, log in with your email address.</h5>
                <form method="post" onSubmit={submitHandler}>
                    <InputField labelFor='name' label='Name' required='*' inputType='text' onChange={(e) => setName(e.target.value)} />
                    <InputField labelFor='email' label='Email' required='*' inputType='email' onChange={(e) => setEmail(e.target.value)} />
                    <InputField labelFor='password' label='Password' required='*' inputType='password' onChange={(e) => setPassword(e.target.value)} />
                    <div className="submit-register">
                        <Link to='/login' className='reg-form-login-button'>Login</Link>
                        <button type="submit" className='reg-form-submit-button' disabled={loading} >Create an Account</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignUp;