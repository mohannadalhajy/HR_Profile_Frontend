import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    makeStyles,
    MenuItem
} from '@material-ui/core';
import DialogDisplay from './DialogDisplay';
import DialogCountryCode from './DialogCountryCode';
const useStyles = makeStyles((theme) => ({
    disableTransform: {
      textTransform: 'none'
    }
  }));
function DialogSettings({ open, setOpen }) {
    const classes = useStyles();
    const [openDisplay, setOpenDisplay] = useState(false);
    const [openCountryCode, setOpenCountryCode] = useState(false);
    
    return (
        <div>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Settings
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <MenuItem onClick={()=>setOpenDisplay(true)}>Display</MenuItem>
                    <MenuItem onClick={()=>setOpenCountryCode(true)}>Country code</MenuItem>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpen(false)}
                    className={classes.disableTransform}
                    color="primary">
                    Exit
                </Button>
            </DialogActions>
        </Dialog>
        <DialogDisplay open={openDisplay} setOpen={setOpenDisplay} />
        <DialogCountryCode open={openCountryCode} setOpen={setOpenCountryCode} />
        </div>
    );
}
export default DialogSettings;