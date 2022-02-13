import React from 'react';
import BaseTextValidator from './BaseTextValidator';
function NameTextValidator({required, name, value, label, onChange}) {   
    return (
        <BaseTextValidator
            dir={value.match('^[\u0621-\u064A]{1,20}$')?"rtl":"ltr"}
            required={required}
            validators={['matchRegexp:^[a-z A-Z\u0621-\u064A.]{1,20}$']}
            errorMessages={['Enter name between 1 -> 20 letters']}
            name={name}
            value={value}
            onChange={onChange} 
            label={label} />
    );
}
export default NameTextValidator;
