import React from 'react';
import {Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BaseTextValidator from '../../Base/BaseTextValidator';
import DeleteIcon from '@material-ui/icons/Delete';
import Address from './Address'
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
    },
    formLabel :{
        fontSize:"25px",
        marginTop:"12px",
        marginBottom:"5px",
    },
    interactionButton: {
        margin:"4px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));
function EditFields({fields, changeField, changeFieldRequired, deleteField}) {   
    const classes = useStyles();
    return (
        <React.Fragment>
        <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">
        </Grid>
        {fields.length <= 0 ?<div></div>:
            fields.map(field => (
            <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item xs={6} sm={6} md={6} lg={6}>
                {field.type==="Text"?
                    <BaseTextValidator
                        required={field.isRequired}
                        onChange={e => changeField(e)}
                        value={field.content} 
                        name={field.name}
                        label={field.name} />
                :field.type==="Address"?
                <Address addressState={field.content} setAddressState={e => changeField(e)} type="edit"/>
                :field.type==="email"?
                    <BaseTextValidator 
                        required={field.isRequired}
                        onChange={e => changeField(e)}
                        name={field.name}
                        value={field.content} 
                        label={field.name} />
                :
                    <BaseTextValidator 
                        required={!field.isRequired}
                        onChange={e => changeField(e)}
                        name={field.name}
                        value={field.content} 
                        label={field.name}/>
                }
                
                
                
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} className={classes.actionButton} >
                <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    size="small"
                    style={{margin:"4px"}}
                    onClick={()=>{
                        deleteField(field.name)
                    }}
                    color="secondary"
                ></Button>
                <Button
                    variant="contained"
                    name={field.name}
                    size="small"
                    onClick={e=>changeFieldRequired(field.name)}
                    color="secondary">
                    {field.isRequired?"Required":"Not Required"}
                </Button>
            </Grid>
            </Grid>
            
            ))
        } 
        </React.Fragment>
      )
}
//export default EditFields;
