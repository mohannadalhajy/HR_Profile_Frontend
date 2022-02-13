import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import ResponsesTable from './ResponsesTable';
import { 
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@material-ui/core';
import { getResponses } from '../../Redux/Responses/ResponseActions';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
       // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/home.jpg'})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:'#218490',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        '& > *': {
        },    
        flexGrow: 1,
    },
    disableTransform: {
        textTransform: 'none'
    },
}));


function Responses({open, setOpen}) {   
    const classes = useStyles();
    const dispatch = useDispatch();
    const admin = useSelector(state => state.Admin);
    useEffect(()=>{
        dispatch(getResponses)
    },[dispatch]);
    const handleClose = () => {
        setOpen(false)
    };
    return (
        <div>
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Responses Management</DialogTitle>
        <DialogContent>
            {admin.admin.email===undefined?<div></div>:<ResponsesTable/>}
        </DialogContent>
        <DialogActions>
            <Button 
            onClick={handleClose} 
            className={classes.disableTransform}
            color="primary" autoFocus>
                Exit
            </Button>
        </DialogActions>
    </Dialog>
    </div>
    );
}
export default Responses;
