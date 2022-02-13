import React, { useState, useEffect } from "react";
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button} from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { getProfile, signupAdmin} from "../../Redux/Profile/ProfileActions";

import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  signin: {
    background: 'rgba(44,62,80,0.3)',
    borderRadius:'20px',
    padding: '40px',
    width: '250px',
    margin: 'auto',
    marginTop: '90px',
    marginLeft: '180x',
    textAlign:'center'
    
  },
  button1: {
    backgroundImage: `url(https://kic-kw.com/assets/img/svg-mask.svg) !important`,
    borderColor:'#183861',
    backgroundColor:'#183861',
    
    padding:'19.5px 28.5px',
    borderRadius:'50px',
    backgroundSize:'100% 100%',
    fontWeight: 'bold',
    margin:'16px 4px 0',
    lineHeight:'1',
    letterSpacing:'1.5px',
    position:'relative',
    overflow:'hidden',
    borderWidth:'2px',
    fontSize:'16px',
    fontFamily:'philosopher',
    textAlign:'center',
    whiteSpace:'nowrap',
    border:'1px solid transparent',
    color:'#C2A377',
    
    "&:hover": {
      backgroundColor:'#C2A377',
      borderColor:'#c38b3c',
      color:'#183861'
  }
  },
  link: {
    margin:'5px',
    font:'13px',
    fontFamily:'Tahoma Geneva, sans-serif',
    color: 'blue',
    textDecoration: 'blink'
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Signup({admin_store,signupAdmin,getProfile})
{
  console.log("admin_store : \n",admin_store)
    let history = useHistory();
    const classes = useStyles();
    const [showPassword, setShowPassword] = React.useState(false);
    // const admin = useSelector(state => state.Admin);
    const [FormState, setFormState] = useState({
      email: "mohannad@gmail.com",
      firstName:"Mohannad",
      lastName:"Mohannad",
      password: "12345678",
      ConfirmPassword:"12345678",
    });
    const [SnackbarState, setSnackbarState] = useState({
      open: true,
      vertical: 'top',
      horizontal: 'center',
      severity: "error",
      message: "",
    });
    
    useEffect(() => {
      (async () => {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          getProfile()
     //     dispatch(getOffers);
          history.push("/Offers");
        }
      })();
    }, [history]);

    const SnackbarClose = () => {
      setSnackbarState({...SnackbarState,open:false})
    }
    
    const handleChange = (e) => {
      setFormState({ ...FormState, [e.target.name]: e.target.value });
    };
  
   
    const handleClickShowPassword = () => {
      setShowPassword(showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit = async (e) => {
      if(FormState.password !== FormState.ConfirmPassword) {
        setSnackbarState({...SnackbarState,open:true,message:"The Confirm Password is not similar to password"})
        return;
      }
      setSnackbarState({...SnackbarState,open:true})
      const { email, password, firstName, lastName } = FormState;
      signupAdmin({ email, password, firstName, lastName })
      
  };
  
  return (
  <div className={classes.signin}>

  <Snackbar open={SnackbarState.open&&(admin_store.loading||admin_store.error)} anchorOrigin={{ vertical:SnackbarState.vertical, horizontal:SnackbarState.horizontal }} autoHideDuration={6000} >
    <Alert onClose={SnackbarClose} severity={admin_store.error?"error":"info"}>
      {admin_store.error?admin_store.error:"Wait please"}
    </Alert>
  </Snackbar>
  {admin_store.admin.firstName?<div>{history.push("verify_code")}</div>:
  <div>
    <div className="App">
      <div  className="form-container" >
        <br></br>
        <h2 style={{color:'#000'}}>Sign Up</h2>
        <ValidatorForm 
          component="fieldset" 
          dir="rtl" onSubmit={(e) => handleSubmit(e)} 
          encType="multipart/form-data">   
        <TextValidator 
          required validators={['required']}
          errorMessages={['this field is required']}
          name="firstName" id="firstName"
          value = {FormState.firstName}
          onChange={(e) => handleChange(e)}
          label="First Name" />
        <TextValidator
          required validators={['required']}
          errorMessages={['this field is required']}
          name="lastName" id="lastName"
          value = {FormState.lastName}
          onChange={(e) => handleChange(e)}
          label="Last Name" />
        <TextValidator
          required validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']} 
          name="email" id="email" 
          value = {FormState.email} 
          onChange={(e) => handleChange(e)} 
          label="Email Address" />
        <br />
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
          }/>
          <br />
          <br />

      <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
        <Input
          id="confirm_password"
          type={showPassword ? 'text' : 'password'}
          value={FormState.ConfirmPassword}
          name="ConfirmPassword"
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
          }/>
      
        <br />
        <br />
        <Button 
          variant="contained" 
          type="submit"
          name="Login"
          className={classes.button1}>Sign Up</Button>
      </ValidatorForm>
      <div>
      <br /><br />
        
      Already have account?
      <Link className={classes.link} to='/'>Log In</Link>
      </div>
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
    signupAdmin : (body) =>{
      dispatch(signupAdmin(body))
    },
    getProfile: (body) =>{
      dispatch(getProfile());
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Signup) ;
