import React, { useEffect, useState } from "react";
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { makeStyles, Button, Select, MenuItem } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_ROUTE } from "../../constants";
import { addAdmin } from "../../Redux/Admins/Actions";
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  signin: {
    background: 'rgba(44,62,80,0.3)',
    borderRadius: '20px',
    padding: '40px',
    width: '250px',
    margin: 'auto',
    marginTop: '90px',
    marginLeft: '180x',
    textAlign: 'center'

  },
  link: {
    margin: '5px',
    font: '13px',
    fontFamily: 'Tahoma Geneva, sans-serif',
    color: 'blue',
    textDecoration: 'blink'
  },
  button: {
    backgroundColor: "#1a73e8",
    color: "white",
    textTransform: 'none',
    margin: '5px',
    "&:hover": {
      backgroundColor: "#1a73e8",
    }
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function AddAdmin() {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const admins = useSelector(state => state.Admins)
  const admin = useSelector(state => state.Admin)
  const tenants = useSelector(state => state.Tenants)
  const [adminsLength,] = useState(admins.admins.length);
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState();
  const [tenant, setTenant] = useState();
  const [password, setPassword] = useState();
  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }


  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
    return function cleanup() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
    };
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleAddUser = () => {
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(addAdmin({ password: password, email: email }, tenant))
  }

  return (
    <div>
      {admin.admin.email === undefined && !admin.loading ? history.push(LOGIN_ROUTE) :
        <div className={classes.signin} >
          {adminsLength !== admins.admins.length ? history.goBack() : <div></div>}
          <Snackbar open={SnackbarState.open && (admins.loading || admins.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={admins.error ? "error" : "info"}>
              {admins.error ? admins.error : "Please Wait"}
            </Alert>
          </Snackbar>

          <br></br>
          <h2 style={{ color: '#000' }}>Add User</h2>
          <ValidatorForm
            component="fieldset"
            dir="rtl" onSubmit={handleAddUser}
            enctype="multipart/form-data">
            <TextValidator
              required
              fullWidth
              validators={['isEmail']}
              errorMessages={['Enter Email']}
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              label="Email" />

            <br />
            <Select
              required
              fullWidth
              name="tenantName"
              value={tenant}
              onChange={e => setTenant(e.target.value)}>
              {tenants.length === 0 ? <React.Fragment /> :
                tenants.tenants.map(tenant => (
                  <MenuItem value={tenant}>{tenant.name}</MenuItem>
                ))
              }
            </Select>

            <br />
            <TextValidator
              required
              validators={['matchRegexp:.{8}']}
              errorMessages={['Enter 8 chracter at least']}
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle Password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <br />
            <TextValidator
              label="Repeat password"
              name="repeatPassword"
              required
              type={showPassword ? 'text' : 'password'}
              validators={['isPasswordMatch']}
              errorMessages={['password mismatch']}
              value={repeatPassword}
              onChange={(e) => { setRepeatPassword(e.target.value) }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle Password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <br />
            <br />
            <Button
              variant="contained"
              className={classes.button}
              type="submit" >Add admin</Button>
          </ValidatorForm>
        </div>
      }
    </div>
  );
}



export default AddAdmin;