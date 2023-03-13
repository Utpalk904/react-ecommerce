import React from 'react';
import { Link } from 'react-router-dom';

function FooterList(props) {
  return (
    <div className='footer-list'>
        <div className="footer-list-heading">
            {props.heading}
        </div>
        <div className="footer-list-item"><Link to={props.linkTo1}>{props.item1}</Link></div>
        <div className="footer-list-item"><Link to={props.linkTo2}>{props.item2}</Link></div>
        <div className="footer-list-item"><Link to={props.linkTo3}>{props.item3}</Link></div>
        <div className="footer-list-item"><Link to={props.linkTo4}>{props.item4}</Link></div>
        <div className="footer-list-item"><Link to={props.linkTo5}>{props.item5}</Link></div>
        <div className="footer-list-item"><Link to={props.linkTo6}>{props.item6}</Link></div>
    </div>
  )
}

export default FooterList;