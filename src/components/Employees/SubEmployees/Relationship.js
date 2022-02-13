import React from 'react';
import Contact from './Contact';
import DisplayContact from './DisplayContact';
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined';
const types=["Parent", "Mother", "Father", "Brother", "Sister", "Spouse", "Child", "Friend", "Relative"]
function Relationship({relationshipState, setRelationshipState, type, setIsDisabled}) {       
    return (
        type==="edit"?
        <Contact 
          types={types} 
          contactState={relationshipState} 
          title="Relationship" 
          setContactState={setRelationshipState}
          setIsDisabled={setIsDisabled}
          contentType="relationship"
          icon={<GroupWorkOutlinedIcon/>}
          ></Contact>:
          <DisplayContact 
          contactState={relationshipState} 
          icon={<GroupWorkOutlinedIcon/>}
          title="Relationship" 
          ></DisplayContact>
      )
}
export default Relationship;
