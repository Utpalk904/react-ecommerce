import React from 'react';
import '../css/ContactUs.css';

function InputField(props) {
  return (
    <div className="input-field">
        <label htmlFor={props.labelFor}>
            {props.label}
            <span className='required'>{props.required}</span>
        </label>
        {(props.required==="*")?<input type={props.inputType} id={props.labelFor} name={props.label} autoComplete='off' required/> : <input type={props.inputType} id={props.labelFor} name={props.label} autoComplete='off'/>}
        
    </div>
  )
}

export default InputField;