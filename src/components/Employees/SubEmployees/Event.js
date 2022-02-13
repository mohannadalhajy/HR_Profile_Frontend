import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
const types=["Birthday", "Anniversary", "Other"]
function Event({eventState, setEventState, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact 
          types={types} 
          contactState={eventState} 
          title="Event" 
          setContactState={setEventState}
          contentType="event"
          setIsDisabled={setIsDisabled}
          icon={<EventRoundedIcon />}
          ></Contact>:
          <DisplayContact 
          contactState={eventState} 
          icon={<EventRoundedIcon />}
          title="Event" 
          ></DisplayContact>
      )
}
export default Event;
