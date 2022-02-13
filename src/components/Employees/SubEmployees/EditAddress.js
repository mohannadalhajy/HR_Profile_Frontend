/*import React, { useState, useEffect } from 'react';
import {Button, Grid} from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import NameTextValidator from '../../Base/NameTextValidator';
function EditAddress({addressState, 
                           setAddressState, 
                           classes, labelNames, columnNames}) {     
    const handleChange = (e) => {
        setAddressState({ ...addressState, [e.target.name]: e.target.value });
    };
    return (
        <React.Fragment>
        <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">
            <Grid item xs={9} sm={5} md={5} lg={5} className={classes.actionButton} >
                <FormLabel className={classes.formLabel} htmlFor="status">
                    Address
                </FormLabel>
            </Grid>
           
        </Grid>

        {columnNames.map((key,i) => (
            <NameTextValidator
              name={key}
              key={key}
              id={key}
              value={addressState[key]}
              onChange={e => handleChange(e)} 
              label={labelNames[i]} />
          ))}
    </React.Fragment>
    );
}
export default EditAddress;
*/