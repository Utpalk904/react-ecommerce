import React from 'react';
import '../css/ContactUs.css';

function InputField(props) {
  return (
    <div className="input-field">
      <label htmlFor={props.labelFor}>
        {props.label}
        <span className='required'>{props.required}</span>
      </label>
      {(props.required === "*") ? <input type={props.inputType} defaultValue={props.default} value={props.value} onChange={props.onChange ? (e) => props.onChange(e) : undefined} id={props.labelFor} name={props.labelFor} autoComplete='off' required /> : <input type={props.inputType} onChange={props.onChange ? (e) => props.onChange(e) : undefined} id={props.labelFor} defaultValue={props.default} value={props.value} name={props.labelFor} autoComplete='off' />}
    </div>
  )
}

export default InputField;