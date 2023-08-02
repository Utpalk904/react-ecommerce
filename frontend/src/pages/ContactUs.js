import React from 'react';
import '../css/ContactUs.css';
import PageHeader from '../components/PageHeader';
import BreadCrums from '../components/BreadCrums';
import { useSelector } from 'react-redux';
import InputField from '../components/InputField';

function ContactUs() {

    const { user } = useSelector((state) => state.user);

    return (
        <div className='contact-us'>
            <PageHeader pageHeader='Contact Us' />
            <BreadCrums address='Contact Us' />
            <div className="contact-form">
                <h2>SEND ME A MESSAGE</h2>
                <form action='https://formspree.io/f/xnqyqlpo' method='POST'>
                    <InputField labelFor='name' label='Name' required='*' default={user && user.name} inputType='text' />
                    <InputField labelFor='email' label='Email' required='*' default={user && user.email} inputType='email' />
                    <InputField labelFor='phone' label='Phone Number' inputType='tel' />
                    <div className="input-field">
                        <label htmlFor="comment">
                            Content
                            <span className='required'>*</span>
                        </label>
                        <textarea id='comment' aria-required='true' name='Message' />
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default ContactUs;