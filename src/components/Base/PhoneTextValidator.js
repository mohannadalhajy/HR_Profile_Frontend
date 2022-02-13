import React from 'react';
import MuiPhoneNumber from 'material-ui-phone-number'
//<MuiPhoneNumber defaultCountry={'us'} onlyCountries={['bh']}/>
/*<BaseTextValidator
            required={required}
            validators={['matchRegexp:^[+]?[0-9 ]{5,20}$']}
            errorMessages={['Enter Phone Number Ex:+965 50872287']}
            name={name}
            value={value}
            onChange={onChange} 
        label={label} />*/
function PhoneTextValidator({required, name, value, label, onChange}) {   
    return (
            <MuiPhoneNumber 
                required={required}
                preferredCountries={['kw', 'bh', 'eg', 'iq', 'jo', 'lb', 'ly', 'ma', 'om', 'ps', 'qa', 'sd','sy','tn','ae','ye','sa']}
                name={name}
                value={value}
                onChange={onChange} 
                label={label}
            />
    );
}
export default PhoneTextValidator;
