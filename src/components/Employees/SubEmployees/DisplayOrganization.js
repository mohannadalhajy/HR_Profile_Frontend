import React from 'react';
function DisplayOrganization({organizationState, 
                           classes}) {     
    return (
        <React.Fragment>
        

        <div className={classes.formLabel}>
        {organizationState?
            (organizationState.jobTitle?organizationState.jobTitle+(organizationState.department||organizationState.company?"•":""):"")+
            (organizationState.department?organizationState.department+(organizationState.company?"•":""):"")+
            (organizationState.company?organizationState.company:"")
          :""}
            </div>
    </React.Fragment>
    );
}
export default DisplayOrganization;
