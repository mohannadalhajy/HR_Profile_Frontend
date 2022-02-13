import React, { useState } from 'react';
import {
    LinearProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles
} from '@material-ui/core';
import { getExportProgressPercentage, getImportProgressPercentage } from '../../Redux/Employees/clientEmployee';
const useStyles = makeStyles((theme) => ({
    disableTransform: {
        textTransform: 'none'
    },
    progress: {
        width: '200px'
    }
}));
function DialogProgress({type}) {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);
    React.useEffect(() => {
        let check = true;
        const timer = setInterval(() => {
            if(check){
                check = !check;
                const promise = type==="export"?getExportProgressPercentage():getImportProgressPercentage();
                promise.then(res=>{setProgress(res.data.result.percentage); check = true;})
            }
        }, 1500);
        return () => {
            clearInterval(timer);
        };
    }, [type]);
    return (
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
                {console.log("ffff",progress)}
            </DialogTitle>
            <DialogContent>
                    <div className={classes.progress}>
                        <LinearProgress variant="determinate" value={progress} />
                    </div>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}
export default DialogProgress;