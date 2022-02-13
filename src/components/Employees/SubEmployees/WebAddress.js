import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import LinkIcon from '@material-ui/icons/Link';
function WebAddress({webAddressState, setWebAddressState, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact 
          contactState={webAddressState} 
          title="Web address" 
          setContactState={setWebAddressState}
          contentType="web"
          setIsDisabled={setIsDisabled}
          icon={<LinkIcon/>}
          ></Contact>:
          <DisplayContact 
          contactState={webAddressState} 
          title="Web address" 
          contentType="web"
          icon={<LinkIcon/>}
          ></DisplayContact>
      )
}
export default WebAddress;
