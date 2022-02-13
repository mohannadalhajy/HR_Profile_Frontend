import React, { useEffect, useState } from 'react';
import { 
    Button,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Radio} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import BaseButton from '../../Base/BaseButton';
import NameTextValidator from '../../Base/NameTextValidator';
const useStyles = makeStyles((theme) => ({
    radio:{
        marginLeft:"30px"
    }
}));

function AddFieldDialog({addFieldOpen, handleCloseAddField, addField, existFields}) {       
    const classes = useStyles();
    const [value, setValue] = useState("")
    const [fieldTypes, setFieldTypes] = useState(["Text","Address","IM Account","Website","Event","Relationship","SIP","Notes"]);
    const [type, setType] = useState("Text")
    useEffect(()=>{
        if(existFields!==undefined) setFieldTypes(fieldTypes.filter((element)=>!existFields.includes( element )))
    },[])
    return (
    <Dialog
        open={addFieldOpen}
        onClose={()=>{handleCloseAddField();setValue("")}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Add Field
        </DialogTitle>
        <DialogContent>
            <ValidatorForm 
                component="fieldset" 
                onSubmit={e=> {
                    addField(e)
                    if(e.target.type.value!=="Text") setFieldTypes(fieldTypes.filter(element=>element!==e.target.type.value))
                    setValue("")
                }}>
                <FormLabel htmlFor="status">Type</FormLabel>
                <RadioGroup 
                    required 
                    aria-label="Type" 
                    name="type" 
                    value={type}
                    onChange={e=>{setType(e.target.value)}}
                    id="type" 
                    className={classes.radio}>
                    {fieldTypes.map(element => (
                        <FormControlLabel value={element} control={<Radio />} label={element} />                        
                    ))}
                </RadioGroup>
                {type==="Text"?
                <React.Fragment>
                <NameTextValidator 
                    required={false}
                    value={value}
                    onChange={e=>{setValue(e.target.value)}}
                    name="FieldName"
                    label="Field Name" />
                    <br />
                <FormLabel htmlFor="required">Required</FormLabel>
                <RadioGroup 
                    required 
                    name="required" 
                    id="required" 
                    className={classes.radio}>
                    <FormControlLabel value="Required" control={<Radio />} label="Required" />
                    <FormControlLabel value="Not Required" control={<Radio />} label="Not Required" />
                </RadioGroup>
                <br />
                </React.Fragment>
                :<React.Fragment />}
                
                <BaseButton content="Add Field" type="submit" />
            </ValidatorForm>
        </DialogContent>
        <DialogActions>
            <Button 
                onClick={()=>{
                    handleCloseAddField()
                    setValue("")
                }}
                color="primary" autoFocus>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
      )
}
export default AddFieldDialog;
