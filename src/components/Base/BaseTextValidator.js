import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
    textValidator:{
        fontSize:"large",
    }
}));


function BaseTextValidator({required, validators, errorMessages, value, name, label, onChange, dir, multiline}) {   
    const classes = useStyles();
    
    return (
        <TextValidator
            dir={dir}
            fullWidth
            multiline={multiline}
            className={classes.textValidator}
            required={required}
            validators={validators}
            errorMessages={errorMessages}
            name={name}
            value={value}
            onChange={onChange} 
            label={label} />
    );
}
export default BaseTextValidator;
