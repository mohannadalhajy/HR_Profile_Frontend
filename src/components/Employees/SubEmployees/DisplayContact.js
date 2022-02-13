import React from 'react';
import {
        Grid,
        FormLabel,
        IconButton,
        Tooltip} from '@material-ui/core';
import {  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DisplayAddressDetails from './DisplayAddressDetails';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    actionButton: {
        marginTop:"12px",
        marginBottom:"5px",
        color:"#5f6368"
    },
    formLabel :{
        color:"#2962ff",
        wordWrap:"break-word"
    },
    formLabelBlack :{
        color:"#202124",
        wordWrap:"break-word"
    },
    interactionButton: {
        margin:"4px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));
function DisplayContact({contactState, icon, title, expand, contentType, textColor}) {   
    const classes = useStyles();
    return (
    <Grid className={classes.root} container xs={11} direction="row" alignItems="stretch">
        <Grid item xs={2} sm={1}>
            <IconButton
                edge="start"
                aria-label="menu"
                className={classes.icon}>
                <Tooltip title={title}>{icon}</Tooltip>
            </IconButton>
        </Grid>
        <Grid item xs={9} sm={10}>
        {contentType==="note"?
        <Grid container direction="row" alignItems="stretch">
            <Grid item xs={7} md={6} className={classes.actionButton}>
                <FormLabel className={classes.formLabelBlack} htmlFor="status">
                    {contactState}
                </FormLabel>
            </Grid>
        </Grid>    
        :contactState.map((item, index)=>(
            <Grid key={index} container direction="row" alignItems="stretch">
                <Grid item xs={7} md={6} className={classes.actionButton}>
                    {contentType==="address"?
                        <DisplayAddressDetails className={classes.formLabel} expand={expand} addressState={item}/>
                    :contentType==="phone"?<FormLabel className={classes.formLabel} htmlFor="status">
                        {item.code+item.info}
                    </FormLabel>
                    :<FormLabel className={contentType==="email"||contentType==="web"?classes.formLabel:classes.formLabelBlack} htmlFor="status">
                    {item.info}
                </FormLabel>}
                </Grid>
                {item.type?<Grid item xs={4} md={5} className={classes.actionButton}>
                        {item.type}
                </Grid>:<React.Fragment />}
            </Grid>
        ))
        }
        </Grid>
    </Grid>
    )
}
export default DisplayContact;
