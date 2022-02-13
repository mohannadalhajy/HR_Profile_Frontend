import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
function Notes({notesState, setNotesState, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact 
          contactState={notesState} 
          title="Notes" 
          setContactState={setNotesState}
          contentType="note"
          setIsDisabled={setIsDisabled}
          icon={<NoteOutlinedIcon/>}
          ></Contact>:
          <DisplayContact 
          contactState={notesState} 
          contentType="note"
          title="Notes" 
          icon={<NoteOutlinedIcon/>}
          ></DisplayContact>
      )
}
export default Notes;
