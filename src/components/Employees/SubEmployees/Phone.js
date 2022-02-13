import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
const types=["Mobile", "Home", "Work", "Work Fax", "Home Fax", "Pager", "Other", "Callback"]
function Phone({phoneState, setPhoneState, type, setIsDisabled}) {
    const title = "Phone Number"
    const contentType = "phone"
    return (
        type==="edit"?
        <Contact 
          types={types} 
          contactState={phoneState} 
          title={title}
          setContactState={setPhoneState}
          contentType={contentType}
          setIsDisabled={setIsDisabled}
          icon={<PhoneOutlinedIcon />}
          ></Contact>:
          <DisplayContact 
          contactState={phoneState} 
          contentType={contentType}
          title={title} 
          icon={<PhoneOutlinedIcon />}
          ></DisplayContact>
      )
}
export default Phone;
