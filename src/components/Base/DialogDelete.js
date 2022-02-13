import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    RadioGroup,
    FormControlLabel,
    Radio,
    makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
const clientEmployee =require ('../../Redux/Employees/clientEmployee');
const useStyles = makeStyles((theme) => ({
    disableTransform: {
      textTransform: 'none'
    }
  }));
function DialogDelete({ open, setOpen }) {
    const classes = useStyles();  
    const [selectType, setSelectType] = useState("all");
    const dispatch = useDispatch();
    const Employees = useSelector(state => state.Employees);
    const deleteEmployees = () => {
        let body = [];
        if(selectType!=="all")
          Employees.employees.forEach(element => {
            if (element.checked) {
              body.push(element._id);
            }
          });
        body = selectType==="all"?["all"]:body
        const promise = clientEmployee.deleteEmployees(body);
        promise.then(res => {
            if(selectType==="all") dispatch({ type: 'DeleteEmployee', payload: "all" })
            body.forEach(id=>dispatch({ type: 'DeleteEmployee', payload: id }))
            setOpen(false)
        });
    }
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">Delete Employees
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <RadioGroup
                        required={true}
                        aria-label="gender"
                        name="selectType"
                        id="selectType"
                        value={selectType}
                        onChange={e => setSelectType(e.target.value)}>
                        <FormControlLabel value="selected" disabled={Employees.selectedCount === 0} control={<Radio />} label={"Selected Employee (" + Employees.selectedCount + ")"} />
                        <FormControlLabel value="all" control={<Radio />} label={"All Employee (" + Employees.count + ")"} />
                    </RadioGroup>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    className={classes.disableTransform}
                    onClick={() => setOpen(false)}
                    color="primary">
                    Cancel
                </Button>
                <Button 
                    onClick={deleteEmployees} 
                    className={classes.disableTransform}
                    color="primary">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogDelete;