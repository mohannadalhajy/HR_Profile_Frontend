import React, { useState, useEffect } from "react";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { profileMe, login } from "../../Redux/Profile/ProfileActions";
import { connect } from "react-redux";
import BaseButton from "../Base/BaseButton";
import { PREFIX } from "../../constants";
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
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login({ admin_store, login }) {
  let history = useHistory();
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [FormState, setFormState] = useState({
    email: "",
    password: "",
    tenant: ""
  });
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });

  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
      }
    })();
  }, [history]);

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
    setSnackbarState({ ...SnackbarState, open: true, message: "" })
    login(FormState)

  };

  return (
    <div>
      {admin_store.admin.email !== undefined && !admin_store.loading ? history.push(PREFIX) :
        <div>
          <Snackbar open={SnackbarState.open && (admin_store.loading || admin_store.error)} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={admin_store.error || SnackbarState.message ? "error" : "info"}>
              {SnackbarState.message ? SnackbarState.message : admin_store.error ? admin_store.error : "Please wait"}
            </Alert>
          </Snackbar>
          <div className={classes.signin}>
            <div className="form-container" >
              <br></br>
              <h2 style={{ color: '#000' }}>Login</h2>
              <ValidatorForm
                component="fieldset"
                dir="rtl" onSubmit={(e) => handleSubmit(e)}
                encType="multipart/form-data">
                <TextValidator
                  required validators={['required', 'isEmail']}
                  errorMessages={['this field is required', 'email is not valid']}
                  name="email" id="email"
                  value={FormState.email}
                  onChange={(e) => handleChange(e)}
                  label="Email" />
                <br />
                <TextValidator
                  required
                  name="tenant" id="tenant"
                  value={FormState.tenant}
                  onChange={(e) => handleChange(e)}
                  label="Tenant" />
                <br />

                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={FormState.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  } />
                <br />
                <br />
                <BaseButton
                  variant="contained"
                  type="submit"
                  content="Login" />
              </ValidatorForm>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    admin_store: state.Admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (body) => {
      dispatch(login(body))
    },
    getProfile: () => {
      dispatch(profileMe());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
