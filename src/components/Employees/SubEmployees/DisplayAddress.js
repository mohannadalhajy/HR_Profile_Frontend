import React from 'react';
import {Grid} from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
function DisplayAddress({addressState, 
                           classes, labelNames, columnNames}) {     
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
            <div className={classes.formLabel}>
                <FormLabel className={classes.formLabel} htmlFor="status">
                    {labelNames[i]}: 
                </FormLabel>
                <FormLabel className={classes.formLabel} htmlFor="status">
                    {addressState[key]}
                </FormLabel>
                <br />
            </div>
          ))}
    </React.Fragment>
    );
}
