import React, { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { makeStyles, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_ROUTE, TENANTS_ROUTE } from "../../constants";
import { addTenant } from "../../Redux/Tenants/TenantsActions";
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
function AddTenant() {
    const classes = useStyles();
    let history = useHistory();
    const dispatch = useDispatch();
    const tenants = useSelector(state => state.Tenants)
    const admin_store = useSelector(state => state.Admin)
    const [tenantsLength,] = useState(tenants.tenants.length);
    const [SnackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        severity: "error",
        message: "",
    });
    const [name, setName] = useState();
    const [password,] = useState();
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
    const handleAddTenant = () => {
        setSnackbarState({ ...SnackbarState, open: true })
        dispatch(addTenant({ name }))
    }

    return (
        <div>
            {admin_store.admin.email === undefined && !admin_store.loading ? history.push(LOGIN_ROUTE) :
                <div className={classes.signin} >
                    {tenantsLength !== tenants.tenants.length ? history.push(TENANTS_ROUTE) : <div></div>}
                    <Snackbar open={SnackbarState.open && (tenants.loading || tenants.error !== "")} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
                        <Alert onClose={SnackbarClose} severity={tenants.error ? "error" : "info"}>
                            {tenants.error ? tenants.error : "Please Wait"}
                        </Alert>
                    </Snackbar>

                    <br></br>
                    <h2 style={{ color: '#000' }}>Add Tenant</h2>
                    <ValidatorForm
                        component="fieldset"
                        dir="rtl" onSubmit={handleAddTenant}
                        enctype="multipart/form-data">
                        <TextValidator
                            required
                            fullWidth
                            name="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                            label="Name" />

                        <br />
                        <br />
                        <Button
                            variant="contained"
                            className={classes.button}
                            type="submit" >Add tenant</Button>
                    </ValidatorForm>
                </div>
            }
        </div>
    );
}



export default AddTenant;