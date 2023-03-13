import React from 'react';
import FooterContact from './FooterContact';
import '../css/Footer.css';
import FooterList from './FooterList';
import FooterSubs from './FooterSubs';

function Footer() {
  return (
    <div className='footer'>
        <footer>
            <FooterContact/>
            <FooterList heading='Categories' item1='Men' item2='Women' item3='Accessories' item4='Shoes' item5='Dresses' item6='Skirt' linkTo1='/' linkTo2='/' linkTo3='/' linkTo4='/' linkTo5='/' linkTo6='/'/>
            <FooterList heading='Information' item1='About Us' item2='Contact Us' item3='Terms & Conditions' item4='Returns & Exchanges' item5='Shipping & Delivery' item6='Privacy Policy' linkTo1='/about' linkTo2='/contact-us' linkTo3='/' linkTo4='/' linkTo5='/' linkTo6='/'/>
            <FooterList heading='Quick Links' item1='Store Location' item2='My Account' item3='Accessories' item4='Order Tracking' item5='Size Guide' item6='FAQs' linkTo1='/' linkTo2='/' linkTo3='/' linkTo4='/' linkTo5='/' linkTo6='/'/>
            <FooterSubs/>
        </footer>
    </div>
  )
}

export default Footer;