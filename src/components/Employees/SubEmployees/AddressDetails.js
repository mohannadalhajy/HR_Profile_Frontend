import React from 'react';
import BaseTextValidator from '../../Base/BaseTextValidator';
const labelNames=["Street", "PO box", "Neighborhood", "City", "State", "Zip code", "Country"]
const columnNames=["street", "POBox", "neighborhood", "city", "state", "zipCode", "country"]

function AddressDetails({addressState, setAddressState, index, setIsDisabled}) {       
    const handleChange = (e) => {
        addressState.items[index][e.target.name]=e.target.value;
        setAddressState({...addressState});
        setIsDisabled(false)
    };  
    
    return (
    <React.Fragment>

        {columnNames.map((key,i) => (
            <BaseTextValidator
              name={key}
              key={key}
              id={key}
              value={addressState.items[index][key]}
              onChange={e => handleChange(e)} 
              label={labelNames[i]} />
          ))}
    </React.Fragment>
    )
}
export default AddressDetails;
