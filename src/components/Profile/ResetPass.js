import React, { useState } from "react";
//import { getPayloadLogin, getPayloadSignup } from '../../actions/LoginActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from "react-router-dom";
import { makeStyles, Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { initEditProfile, resetPass } from "../../Redux/Profile/ProfileActions";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../../constants";

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
    margin:'5px',
    "&:hover": {
      backgroundColor:"#1a73e8",
    }
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function ResetPass() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const admin_store = useSelector(state => state.Admin)
    let history = useHistory();
    const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [FormState, setFormState] = useState({
    oldPassword: "12345678",
    newPassword: "123456789",
  });

  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }

  const handleChange = (e) => {
    setFormState({ ...FormState, [e.target.name]: e.target.value });
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    setSnackbarState({ ...SnackbarState, open: true })
    dispatch(resetPass(FormState));
  };
  const moveToProfile = () => {
      history.push(PROFILE_ROUTE)
      dispatch(initEditProfile)
  }
  return (
    <div>
      <Snackbar open={SnackbarState.open && (admin_store.loading || admin_store.error)} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
        <Alert onClose={SnackbarClose} severity={admin_store.error ? "error" : "info"}>
        {admin_store.error ? admin_store.error :"Please wait"}
        </Alert>
      </Snackbar>
      {!admin_store.admin.email && !admin_store.loading ?history.push(LOGIN_ROUTE):
        <div className={classes.signin}>
          {admin_store.error==="edited"?moveToProfile():<React.Fragment />}
          <div className="App">
            <div className="form-container" >
              <br></br>
              <h2 style={{ color: '#000' }}>Change Password</h2>
              <ValidatorForm
                component="fieldset"
                dir="rtl" onSubmit={(e) => handleSubmit(e)}
                enctype="multipart/form-data">
                <InputLabel htmlFor="standard-adornment-password">Old Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={FormState.oldPassword}
                  name="oldPassword"
                  onChange={(e) => handleChange(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle Password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  } />

                <br />
                <br />

                <InputLabel htmlFor="standard-adornment-password">New Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={FormState.newPassword}
                  name="newPassword"
                  onChange={(e) => handleChange(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle Password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  } />

                <br />
                <br />
                <Button
                  variant="contained"
                  className={classes.button}
                  type="submit">Reset Password</Button>
              </ValidatorForm>
            </div>
          </div>

        </div>
      }
    </div>
  );
}



export default ResetPass;