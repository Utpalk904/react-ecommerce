import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ErrPage.css';

const PageNotFound = () => {
    return (
        <div className='not-found'>
            <div className="error">
                <h1>404</h1>
                <h2>SORRY! PAGE YOU ARE LOOKING CAN'T BE FOUND</h2>
                <h3>Go back to <Link to='/'>homepage</Link></h3>
            </div>
        </div>
    )
}

export default PageNotFound;