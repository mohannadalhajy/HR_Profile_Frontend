import React, { useEffect, useState } from "react";
//import { getPayloadLogin, getPayloadSignup } from '../../actions/LoginActions';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory, useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_ROUTE, TENANTS_ROUTE } from "../../constants";
import {TextValidator} from 'react-material-ui-form-validator';
import { editTenant, initEditTenant } from "../../Redux/Tenants/TenantsActions";
const TenantsClient = require('../../Redux/Tenants/TenantsClient')
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
function EditTenant() {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const tenants = useSelector(state => state.Tenants)
    const admin_store = useSelector(state => state.Admin)
    const [SnackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        severity: "error",
        message: "",
    });
    const [name, setName] = useState();
    const [dbName, setDBName] = useState();
    const SnackbarClose = () => {
        setSnackbarState({ ...SnackbarState, open: false })
    }
    const handleEditTenant = async (e) => {
        setSnackbarState({ ...SnackbarState, open: true })
        var str = location.search;
        var pos = str.substring(1);
        dispatch(editTenant({
            "id": pos,
            "body": { name, dbName }
        }))
    }
    useEffect(() => {
        var str = location.search;
        var id = str.substring(1);
        const promise = TenantsClient.getById(id);
        promise.then(res => {
            setName(res.data.result.name)
            setDBName(res.data.result.dbName)
        }).catch(
            err => {
                console.log("error in edit admin", err)
            }
        );
    }, [location]);
    const moveToDetails = () => {
        history.push(TENANTS_ROUTE)
        dispatch(initEditTenant)
    }
    return (
        <div>
            {tenants.error === "edited" ? moveToDetails() : <React.Fragment />}
            <Snackbar open={SnackbarState.open && (tenants.loading || tenants.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
                <Alert onClose={SnackbarClose} severity={tenants.error ? "error" : "info"}>
                    {tenants.error ? tenants.error : "Please Wait"}
                </Alert>
            </Snackbar>
            {!admin_store.admin.email && !admin_store.loading ? history.push(LOGIN_ROUTE) :
                <div className={classes.signin} >
                    <br></br>
                    <h2 style={{ color: '#000' }}>Edit tenant</h2>
                    <ValidatorForm
                        component="fieldset"
                        dir="rtl" onSubmit={(e) => handleEditTenant(e)}
                        enctype="multipart/form-data">
                        <TextValidator
                            required
                            fullWidth
                            name="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            label="Name" />
                        <TextValidator
                            required
                            fullWidth
                            name="dbName"
                            value={dbName}
                            onChange={(e) => { setDBName(e.target.value) }}
                            label="dbName" />
                        <br />
                        <br />
                        <Button
                            variant="contained"
                            className={classes.button}
                            type="submit" >Edit tenant</Button>
                    </ValidatorForm>
                </div>
            }
        </div>
    );
}



export default EditTenant;