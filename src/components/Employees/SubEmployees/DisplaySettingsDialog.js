import React, { useState } from 'react';
import { 
    Button,
    Switch,
    Grid,
    makeStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles((theme) => ({
    disableTransform: {
        padding:"6px"
    },
    label:{
    display: 'flex',
    justifyContent:'left',
    alignItems:'center',
}
}));

function DisplaySettingsDialog({ChangeSwitchField, handleChangeSwitch, employee}) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <div>
        

        <IconButton onClick={() => {handleClickOpen();}} className={classes.disableTransform}><SettingsIcon/></IconButton>
                
        <Dialog
            open={open}
            maxWidth='xs'
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Display Control"}
            </DialogTitle>
            <DialogContent>
            <Grid container>
                <Grid item xs={3} className={classes.label}>
                phone:
                </Grid> 
                <Grid item xs={3}>
                <Switch
                    checked={employee.phoneDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="phoneDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid> 
                <Grid item xs={3} className={classes.label}>Email: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.emailDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="emailDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                <Grid item xs={3} className={classes.label}>Organization: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.organizationDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="organizationDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                {employee.image?<React.Fragment>
                <Grid item xs={3} className={classes.label}>Image: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.imageDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="imageDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                
                </React.Fragment>:<React.Fragment/>}
                
                {true?<React.Fragment>
                <Grid item xs={3} className={classes.label}>Address: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.addressDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="addressDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                </React.Fragment>:<React.Fragment />}
                
                {true?<React.Fragment>
                <Grid item xs={3} className={classes.label}>IM Account: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.IMAccountDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="IMAccountDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> 
                </Grid>
                </React.Fragment>:<React.Fragment />}
                
                {true?<React.Fragment>
                <Grid item xs={3} className={classes.label}>Website: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.websiteDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="websiteDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> 
                </Grid>
                </React.Fragment>:<React.Fragment />}
                
                {true?<React.Fragment>
                <Grid item xs={3} className={classes.label}>Event: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.eventDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="eventDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> 
                </Grid>
                </React.Fragment>:<React.Fragment />}
                
                {true?<React.Fragment>
                <Grid item xs={3} className={classes.label}>Relationship: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.relationshipDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="relationshipDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </Grid>
                </React.Fragment>:<React.Fragment />}
                
                {true?<React.Fragment>
                <Grid item xs={3} className={classes.label}>SIP: </Grid>
                <Grid item xs={3}>
                <Switch
                    checked={employee.SIPDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="SIPDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> 
                </Grid>
                </React.Fragment>:<React.Fragment />}
                
                {true?<React.Fragment>
                <Grid item xs={3} className={classes.label}>Notes: </Grid>
                <Switch
                    checked={employee.notesDisplay}
                    onChange={handleChangeSwitch}
                    color="primary"
                    name="notesDisplay"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    /> 
                    </React.Fragment>:<React.Fragment/>}
                {!employee.fields || employee.fields.length <= 0 ?<React.Fragment />:
                employee.fields.filter(field=>field.type&&field.type!=='').map(field => (
                <React.Fragment>
                    <Grid item xs={3} className={classes.label}>{field.type}: </Grid>
                    <Grid item xs={3}>
                    <Switch
                        checked={field.display}
                        onChange={ChangeSwitchField}
                        color="primary"
                        name={field.type}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                </React.Fragment>
                
                ))
                }
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={() => { 
                        handleClose(); 
                    }} 
                    className={classes.disableTransform}
                    color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
        
        </div>
        );
    }


export default DisplaySettingsDialog;
