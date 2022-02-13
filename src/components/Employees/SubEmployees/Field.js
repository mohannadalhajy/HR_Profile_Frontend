import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
function Field({fieldState, setFieldState, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact
          contactState={fieldState} 
          title="Value" 
          setContactState={setFieldState}
          contentType="field"
          setIsDisabled={setIsDisabled}
          icon={<ViewAgendaOutlinedIcon/>}
          ></Contact>:
          <DisplayContact 
          contactState={fieldState} 
          icon={<ViewAgendaOutlinedIcon/>}
          title="Value" 
          ></DisplayContact>
      )
}
export default Field;
