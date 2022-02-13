import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { FormLabel } from '@material-ui/core';
//const labelNames=["Street", "PO box", "Neighborhood", "City", "State", "Zip code", "Country"]
const columnNames=["street", "POBox", "neighborhood", "city", "state", "zipCode", "country"]
/*const useStyles = makeStyles((theme) => ({
    
    actionButton: {
        marginTop:"12px",
        marginBottom:"5px",
    }
}));*/
function DisplayAddressDetails({className, addressState, expand}) {       
    //const classes = useStyles();    
    return (
    columnNames.map((key,i) => (
        (expand||(i!==1&&i!==2))&&addressState[key]!==""?
        <React.Fragment>
            <FormLabel className={className}>{addressState[key]}</FormLabel>
            <br />
        </React.Fragment>
        :<React.Fragment />
    )))
}
export default DisplayAddressDetails;
