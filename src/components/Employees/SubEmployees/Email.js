import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
const types=["Home", "Work", "Other"]
function Email({emailState, setEmailState, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact 
          types={types} 
          contactState={emailState} 
          title="Email" 
          setContactState={setEmailState}
          contentType="email"
          setIsDisabled={setIsDisabled}
          icon={<MailOutlineIcon/>}
          ></Contact>:
          <DisplayContact 
          contactState={emailState} 
          contentType="email"
          icon={<MailOutlineIcon/>}
          title="Email" 
          ></DisplayContact>
      )
}
export default Email;
