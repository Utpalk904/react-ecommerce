import React from 'react';

function FooterSubs() {
  return (
    <div className='footer-subscribe'>
        <div className="footer-subscribe-text">
        Subscribe to our newsletter and get 10% off your first purchase
        </div>
        <div className="footer-input">
            <input type="email" name="email" placeholder='Your Email Address' autoComplete='off' required/>
            <button type='submit'>Subscribe</button>
        </div>
    </div>
  )
}

export default FooterSubs;