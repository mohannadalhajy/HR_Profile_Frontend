import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
const types=["Home", "Work", "Other"]
function Address({addressState, setAddressState, expand, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact 
          types={types} 
          contactState={addressState} 
          title="Address" 
          setContactState={setAddressState}
          contentType="address"
          setIsDisabled={setIsDisabled}
          icon={<LocationOnOutlinedIcon />}
          ></Contact>:
          <DisplayContact 
          contactState={addressState} 
          title="Address" 
          icon={<LocationOnOutlinedIcon />}
          contentType="address"
          expand={expand}
          ></DisplayContact>
      )
}
export default Address;
