import React, { useEffect, useState } from "react";
//import { getPayloadLogin, getPayloadSignup } from '../../actions/LoginActions';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { editSuperAdmin, initEditAdmin } from "../../Redux/SuperAdmins/Actions";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_ROUTE, SUPER_ADMINS_ROUTE } from "../../constants";
import {TextValidator} from 'react-material-ui-form-validator';
const AdminsClient = require('../../Redux/SuperAdmins/Client')
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
function EditSuperAdmin() {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const admins = useSelector(state => state.SuperAdmins)
    const admin_store = useSelector(state => state.Admin)
    const [SnackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        severity: "error",
        message: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const SnackbarClose = () => {
        setSnackbarState({ ...SnackbarState, open: false })
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleEditAdmin = async (e) => {
        setSnackbarState({ ...SnackbarState, open: true })
        var str = location.search;
        var pos = str.substring(1);
        dispatch(editSuperAdmin({
            "id": pos,
            "body": { password: password, email: email }
        }))
    }
    useEffect(() => {
        var str = location.search;
        var id = str.substring(1);
        const promise = AdminsClient.getById(id);
        promise.then(res => {
            setEmail(res.data.result.email)
        }).catch(
            err => {
                console.log("error in edit admin", err)
            }
        );
    }, [location]);
    const moveToDetails = () => {
        history.push(SUPER_ADMINS_ROUTE)
        dispatch(initEditAdmin)
    }
    return (
        <div>
            {admins.error === "edited" ? moveToDetails() : <React.Fragment />}
            <Snackbar open={SnackbarState.open && (admins.loading || admins.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
                <Alert onClose={SnackbarClose} severity={admins.error ? "error" : "info"}>
                    {admins.error ? admins.error : "Please Wait"}
                </Alert>
            </Snackbar>
            {!admin_store.admin.email && !admin_store.loading ? history.push(LOGIN_ROUTE) :
                <div className={classes.signin} >
                    <br></br>
                    <h2 style={{ color: '#000' }}>Edit Admin</h2>
                    <ValidatorForm
                        component="fieldset"
                        dir="rtl" onSubmit={(e) => handleEditAdmin(e)}
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
                        <br />
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            name="password"
                            onChange={(e) => { setPassword(e.target.value) }}
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
                            type="submit" >Edit admin</Button>
                    </ValidatorForm>
                </div>
            }
        </div>
    );
}



export default EditSuperAdmin;