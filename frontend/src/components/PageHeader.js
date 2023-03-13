import React from 'react';
import '../css/ContactUs.css';

function PageHeader(props) {
  return (
    <div className='page-header'>
        <h1>{props.pageHeader}</h1>
    </div>
  )
}

export default PageHeader;