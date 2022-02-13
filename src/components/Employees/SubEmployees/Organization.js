import React, {  } from 'react';
import {
    Grid,
    IconButton,
    Tooltip
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditOrganization from './EditOrganization';
import DisplayOrganization from './DisplayOrganization';
import BusinessIcon from '@material-ui/icons/Business';
const labelNames=["Company", "Job Title", "Department"]
const columnNames=["jobTitle", "department", "company"]
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "10px 0px 20px 20px",
    },
    actionButton: {
        marginTop:"12px",
        marginBottom:"5px"
    },
    formLabel: {
    },
    icon: {
      marginTop:"10px",
      marginBottom:"10px"
    }
}));
function Organization({organizationState, expand, setOrganizationState, type, setIsDisabled}) {     
    const classes = useStyles();
    return (
        type==="display"?<DisplayOrganization expand={expand} classes={classes} organizationState={organizationState}/>
        :
        <Grid container className={classes.root} lg={6} md={7} sm={9} xs={11} direction="row" alignItems="stretch">
           <Grid item xs={2} sm={1} >
              <IconButton
                edge="start"
                aria-label="menu"
                className={classes.icon}>
                <Tooltip title="Name">
                    <BusinessIcon />
                </Tooltip>
              </IconButton>
            </Grid>
            <Grid item xs={10} sm={11}>
                <EditOrganization setIsDisabled={setIsDisabled} expand={expand}  classes={classes} labelNames={labelNames} columnNames={columnNames} organizationState={organizationState} setOrganizationState={setOrganizationState}/>
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4}></Grid>
        </Grid>
    );
}
export default Organization;
