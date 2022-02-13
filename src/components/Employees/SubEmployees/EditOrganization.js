import React, {  } from 'react';
import BaseTextValidator from '../../Base/BaseTextValidator';
function EditOrganization({organizationState, expand,
                           setOrganizationState, setIsDisabled,
                           classes, labelNames, columnNames}) {
    const handleChange = (e) => {
        setOrganizationState({ ...organizationState, [e.target.name]: e.target.value });
        setIsDisabled(false);
    };
    return (
        columnNames.map((key,i) => (
            <React.Fragment>
            {expand||i<columnNames.length-1?
                <BaseTextValidator
                name={key}
                key={key}
                id={key}
                value={organizationState[key]}
                onChange={e => handleChange(e)} 
                label={labelNames[i]} />
            :<React.Fragment />}
            </React.Fragment>
          ))
    );
}
export default EditOrganization;
