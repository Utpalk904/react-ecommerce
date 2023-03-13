import React from 'react';
import { GrFacebookOption } from "react-icons/gr";
import { GrTwitter } from "react-icons/gr";
import { GrGooglePlus } from "react-icons/gr";
import { GrInstagram } from "react-icons/gr";

import { GoLocation } from 'react-icons/go';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlinePhone } from 'react-icons/hi';

import '../css/Footer.css';

function FooterContact() {
  return (
    <div className='footer-contact'>
        <div className="footer-logo">
            <img src="https://claue2.arrowtheme.com/media/logo/stores/10/logo_claue_1.png" alt="nav-logo" />
        </div>
        <div className="footer-address">
            <span className="point-icon icon">
                <GoLocation/>
            </span>
            <span className="address">
                184 Main Rd E, St Albans VIC 3021, Australia
            </span>
        </div>
        <div className="footer-email">
            <span className="email-icon icon">
                <HiOutlineMail/>
            </span>
            <span className="email">
                <a href='mailto:utpalk904@gmail.com'>utpalk904@gmail.com</a>
            </span>
        </div>
        <div className="footer-phone">
            <span className="phone-icon icon">
                <HiOutlinePhone/>
            </span>
            <span className="phone">
                <a href="tel:+918700255519">+91 8700255519</a>
            </span>
        </div>
        <div className="social-icons">
            <span className="facebook">
                <GrFacebookOption />
            </span>
            <span className="twitter">
                <GrTwitter />
            </span>
            <span className="google">
                <GrGooglePlus />
            </span>
            <span className="instagram">
                <GrInstagram />
            </span>
        </div>
    </div>
  )
}

export default FooterContact;