import React, { useEffect } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    makeStyles,
    Switch
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { editDisplay, editDisplays, getDisplays } from '../../Redux/Display/DisplayActions';
const useStyles = makeStyles((theme) => ({
    disableTransform: {
      textTransform: 'none',
      padding: "6px"
    },
    label: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
    }
}));


function DialogDisplay({ open, setOpen }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const displays = useSelector(state => state.Displays);
    useEffect(() => {
        dispatch(getDisplays)
    },[dispatch])
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                Display settings
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    {!(displays && displays.displays.length !== 0) ? <Grid item>Please wait</Grid> :
                        displays.displays.map(display => (
                            <React.Fragment>
                                <Grid item xs={3} className={classes.label}>
                                    {display.name}:
                                </Grid>
                                <Grid item xs={3}>
                                    <Switch
                                        checked={display.display}
                                        onChange={() => { dispatch(editDisplay(display._id)) }}
                                        color="primary"
                                        name="phoneDisplay"
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
                    className={classes.disableTransform}
                    onClick={() => {
                        dispatch(getDisplays)
                        setOpen(false)
                    }} color="primary">
                    Cancel
                </Button>
                <Button
                    className={classes.disableTransform}
                    onClick={() => {
                        setOpen(false)
                        dispatch(editDisplays(displays.displays))
                    }} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogDisplay;