import React, { useEffect } from 'react';
import {
  Grid,
  IconButton,
  Tooltip  
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NameTextValidator from '../../Base/NameTextValidator';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px 0px 20px 20px",
  },
  icon: {
    marginTop:"10px",
    marginBottom:"10px"
  }
}));
const columnNames = ["Name prefix", "First name", "Middle name", "Last name", "Name suffix"]
function Name({nameState, setNameState, expand, setIsDisabled}) {   
    const classes = useStyles();
    const handleChange = (e) => {
      setNameState({ ...nameState, [e.target.name]: e.target.value });
      setIsDisabled(false)
    };
    useEffect(()=>{
      if(nameState._id!==undefined) delete nameState._id
    })
    return (
        <Grid container className={classes.root} lg={6} md={7} sm={9} xs={11} direction="row" alignItems="stretch">
            <Grid item xs={2} sm={1}>
              <IconButton
                edge="start"
                aria-label="menu"
                className={classes.icon}
                >
                <Tooltip title="Name">
                    <PersonOutlineSharpIcon />
                </Tooltip>
              </IconButton>
            </Grid>
            <Grid item xs={10} sm={11}>
              {expand?<NameTextValidator
                name="prefix"
                value={nameState.prefix}
                onChange={e => handleChange(e)} 
                label={columnNames[0]} />:<React.Fragment />}
              <NameTextValidator
                required={true}
                name="first"
                value={nameState.first}
                onChange={e => handleChange(e)} 
                label={columnNames[1]} />
              {expand?<NameTextValidator
                name="middle"
                value={nameState.middle}
                onChange={e => handleChange(e)} 
                label={columnNames[2]} />:<React.Fragment />}
              <NameTextValidator
                required={true}
                name="last"
                value={nameState.last}
                onChange={e => handleChange(e)} 
                label={columnNames[3]} />
              {expand?<NameTextValidator
                name="suffix"
                value={nameState.suffix}
                onChange={e => handleChange(e)} 
                label={columnNames[4]} />:<React.Fragment />}
          
            </Grid>
        </Grid>
      )
}
export default Name;
