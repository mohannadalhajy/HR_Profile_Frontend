import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';
const clientCountryCode = require('../../Redux/CountryCode/clientCountryCode')
const useStyles = makeStyles((theme) => ({
  disableTransform: {
    textTransform: 'none',
    padding: "6px"
  },
  label: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));


function DialogCountryCode({ open, setOpen }) {
  const classes = useStyles();
  const [code, setCode] = useState("");
  const [initCode, setInitCode] = useState("");
  useEffect(() => {
    const promise = clientCountryCode.get();
    promise.then(res=>{
      setCode(res.data.result.code)
      setInitCode(res.data.result.code)
    })
    .catch(err=>setOpen(false))
  })
  const editCountryCode = ()=>{
    const promise = clientCountryCode.patch({code})
    promise.then(res=>{setInitCode(code)})
    .catch(err=>console.log("error in  country code dialog",err))
  }
  const handleChange = (event) => {
    setCode(event.target.value);
  };
  const cancelChange = () => {
    setCode(initCode);
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
        Country code settings
      </DialogTitle>
      <DialogContent>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Code</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={code}
          onChange={handleChange}
        >
        {clientCountryCode.CountryCodeArray().map(country=><MenuItem value={country.code}>{country.name}</MenuItem>)
        }
        </Select>
      </FormControl>
      </DialogContent>
      <DialogActions>

        <Button
          className={classes.disableTransform}
          onClick={() => {
            cancelChange()
            setOpen(false)
          }} color="primary">
          Cancel
        </Button>
        <Button
          className={classes.disableTransform}
          onClick={() => {
            editCountryCode()
            setOpen(false)
          }} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DialogCountryCode;