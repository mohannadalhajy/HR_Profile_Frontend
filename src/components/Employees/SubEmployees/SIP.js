import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import DialerSipOutlinedIcon from '@material-ui/icons/DialerSipOutlined';
function SIP({SIPState, setSIPState, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact 
          contactState={SIPState} 
          title="SIP" 
          setContactState={setSIPState}
          contentType="SIP"
          setIsDisabled={setIsDisabled}
          icon={<DialerSipOutlinedIcon/>}
          ></Contact>:
          <DisplayContact 
          contactState={SIPState} 
          title="SIP" 
          icon={<DialerSipOutlinedIcon/>}
          ></DisplayContact>
      )
}
export default SIP;
