import React from 'react';
import '../css/ContactUs.css';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function BreadCrums(props) {
  return (
    <div className='breadcrums' id={props.isProduct}>
        <span className="breadcrums-home">
            <Link to='/'>Home</Link>
        </span>
        <span className="breadcrums-arrow">
            <AiOutlineRight/>
        </span>
        <span className="breadcrums-address">
            {(props.isProduct==='true')?
                <Link to={props.address1Url??'/products'}>{props.address}</Link>
             : <span className="breadcrums-address">{props.address}</span>}
        </span>
        {(props.isProduct==='true')? <span className="breadcrums-arrow">
            <AiOutlineRight/>
        </span> : <div></div>}
        {(props.isProduct==='true')? <span className="breadcrums-address">
            {props.address2}
        </span> : <div></div>}
    </div>
  )
}

export default BreadCrums;