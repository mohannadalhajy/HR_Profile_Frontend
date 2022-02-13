import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
const types=["WhatsApp", "Facebook", "Hangouts", "QQ", "Skype", "Yahoo", "AIM", "ICQ", "Jabber", "Windows Live"]
function IMAccount({IMState, setIMState, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact 
          types={types} 
          contactState={IMState} 
          title="IM Account" 
          setContactState={setIMState}
          contentType="IM"
          setIsDisabled={setIsDisabled}
          icon={<ChatOutlinedIcon />}
          ></Contact>:
          <DisplayContact 
          contactState={IMState} 
          icon={<ChatOutlinedIcon />}
          title="IM Account" 
          ></DisplayContact>
      )
}
export default IMAccount;
