import React, { useState } from 'react';
import { 
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Grid,
    Button,
    IconButton,
    Divider,
    Radio,
    makeStyles,
    Snackbar,
    Tooltip
} from '@material-ui/core';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ValidatorForm } from 'react-material-ui-form-validator';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {EMPLOYEES_ROUTE, LOGIN_ROUTE} from '../../constants/index';
import { createEmployees } from '../../Redux/Employees/EmployeeActions';
import BaseUploadImage from '../Base/BaseUploadImage';
import NumberTextValidator from '../Base/NumberTextValidator';
import Name from './SubEmployees/Name';
import Email from './SubEmployees/Email';
import Phone from './SubEmployees/Phone';
import Event from './SubEmployees/Event';
import Organization from './SubEmployees/Organization';
import Address from './SubEmployees/Address';
import IMAccount from './SubEmployees/IMAccount';
import WebAddress from './SubEmployees/WebAddress';
import SIP from './SubEmployees/SIP';
import Field from './SubEmployees/Field';
import RelationShip from './SubEmployees/Relationship';
import Notes from './SubEmployees/Notes';
//import EditFields from './SubEmployees/EditFields';
const useStyles = makeStyles((theme) => ({
    root: {
        padding:"0 8px",
        display: 'flex',
        flexGrow: 1,
    },
    fields: {
        margin: "10px 0px 20px 20px",
    },
    radio:{
        marginLeft: "20px"
    },

    showMoreButton:{
        backgroundColor:"#1a73e8",
        textTransform:"none",
        color:"white",
        "&:hover": {
        backgroundColor:"#1a73e8",
        marginLeft: "20px"
        }
    },
    icon: {
      marginTop:"10px",
      marginBottom:"10px"
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
function AddEmployee() {
    let history = useHistory();
    const classes = useStyles();
    const admin = useSelector(state => state.Admin);
    const employees = useSelector(state => state.Employees);
    const [employeesLength, ] = useState(employees.employees.length);
    const [expand,setExpand] = useState(false)
    const [SnackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        severity: "error",
        message: "",
    });
    const [srcImage,setSrcImage] = useState(process.env.PUBLIC_URL + '/assets/profile.png');
    const dispatch = useDispatch();
    const [isDisabled,setIsDisabled] = useState(true)
    const [phoneState, setPhoneState] = React.useState({items:[]})
    const [relationshipState, setRelationshipState] = React.useState({items:[]})
    const [eventState, setEventState] = React.useState({items:[]})
    const [IMState, setIMState] = React.useState({items:[]})
    const [webAddressState, setWebAddressState] = React.useState({items:[]})
    const [SIPState, setSIPState] = React.useState({items:[]})
    const [notesState, setNotesState] = React.useState({items:[]})
    const [emailState, setEmailState] = React.useState({items:[]})
    const [fieldState, setFieldState] = React.useState({items:[]})
    const [addressState, setAddressState] = React.useState({items:[]})
    const [organizationState, setOrganizationState] = React.useState({jobTitle:"",department:"",company:""})
    const [nameState, setNameState] = React.useState({
        prefix:"",
        first:"",
        middle:"",
        last:"",
        suffix:""
    });
    const [employee, setEmployee] = useState({
        id: "",
        civilId:"",
        status: "Active",
        image: "",
        qrcode: "",
        fields: fieldState.items
    });
    const ChangeSwitchField = (e) => {
        employee.fields.forEach(element => {
            if(element.type === e.target.name){
                element.display = e.target.checked;
                return;
            }
        });
        setEmployee({ ...employee, [e.target.name]: e.target.checked });
        setIsDisabled(false)
    };
    const handleChangeSwitch = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.checked });
        setIsDisabled(false)
    };
    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
        setIsDisabled(false)
    };

    const SnackbarClose = () => {
        setSnackbarState({...SnackbarState,open:false})
    }
    /*const changeField = (e) => {
        employee.fields.forEach(element => {
            if(element.name === e.target.name){
                element.content = e.target.value;
                setEmployee({...employee})
                return;
            }
        });
    }*/
    
    /*const addField = (e) => {
        for(let i=0;i<employee.fields.length;i++){
            if(employee.fields[i].name===e.target.FieldName.value) return;
        }
        setEmployee({...employee, fields:[...employee.fields, {name:e.target.FieldName.value,content:"",type:e.target.type.value,isRequired:e.target.required.value==='Required'}]});
    };*/

    const CreateClick = () => {
      setSnackbarState({...SnackbarState,open:true})
      dispatch(createEmployees({...employee, 
            name:nameState,
            email:emailState.items,
            organization:organizationState,
            phone: phoneState.items,//.map(item=>({...item,info:item.info.slice(item.code.length)})), 
            IMAccount:IMState.items,//.map(item=>({...item,info:item.info.slice(item.code.length)})), 
            address: addressState.items, 
            website:webAddressState.items,
            event:eventState.items,
            relationship:relationshipState.items,
            SIP:SIPState.items,
            fields:fieldState.items,
            notes:notesState.items.length!==0?notesState.items[0].info:""}));
    }
    const setImage = (image) => {
        setEmployee({ ...employee, image });
        setIsDisabled(false)
    }
    /*const changeFieldRequired = (name) => {
        employee.fields.forEach(element => {
            if(element.name === name){
                element.isRequired = !element.isRequired;
                setEmployee({...employee})
                return;
            }
        });
    }*/
    /*const deleteField = (name) => {
        setEmployee({...employee,fields:employee.fields.filter(element => element.name!==name)})
    }*/
    
    return (
    <div className={classes.root}>
        {admin.admin.email===undefined && !admin.loading?history.push(LOGIN_ROUTE):
        <Grid container direction="row" alignItems="stretch">
        <Grid item xs={12}>
        {employeesLength!==employees.employees.length?history.push(EMPLOYEES_ROUTE):<div></div>}
        <Snackbar open={SnackbarState.open&&(employees.loading||employees.error!=="")} anchorOrigin={{ vertical:SnackbarState.vertical, horizontal:SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={employees.error?"error":"info"}>
                {employees.error?employees.error:"Please Wait"}
            </Alert>
        </Snackbar>
        <ValidatorForm 
            component="fieldset" 
            onSubmit={CreateClick}
            encType="multipart/form-data">
            <BaseUploadImage 
                employee={employee}
                ChangeSwitchField={ChangeSwitchField}
                handleChangeSwitch={handleChangeSwitch}
                setImage={setImage}
                type="Add"
                isDisabled={isDisabled}
                srcImage={srcImage}
                setSrcImage={setSrcImage}
                image={employee.image}
                />
            <Divider variant="middle" />
            <Name 
                expand={expand} 
                nameState={nameState} 
                setNameState={setNameState} 
                setIsDisabled={setIsDisabled}/>
            <Organization 
                expand={expand} 
                organizationState={organizationState} 
                setOrganizationState={setOrganizationState} 
                setIsDisabled={setIsDisabled}
                type="edit" />
            <Email 
                expand={expand} 
                emailState={emailState} 
                setEmailState={setEmailState} 
                setIsDisabled={setIsDisabled}
                type="edit" />
            <Phone 
                expand={expand} 
                phoneState={phoneState} 
                setPhoneState={setPhoneState} 
                setIsDisabled={setIsDisabled}
                type="edit" />
            {expand?
            <React.Fragment>
                <Address 
                    addressState={addressState} 
                    setAddressState={setAddressState} 
                    setIsDisabled={setIsDisabled}
                    type="edit" />
                <Event 
                    eventState={eventState} 
                    setEventState={setEventState} 
                    setIsDisabled={setIsDisabled}
                    type="edit"/>
                <WebAddress 
                    webAddressState={webAddressState} 
                    setWebAddressState={setWebAddressState} 
                    setIsDisabled={setIsDisabled}
                    type="edit" />
                <RelationShip 
                    relationshipState={relationshipState} 
                    setRelationshipState={setRelationshipState} 
                    setIsDisabled={setIsDisabled}
                    type="edit" />
                <IMAccount 
                    IMState={IMState} 
                    setIMState={setIMState} 
                    setIsDisabled={setIsDisabled}
                    type="edit" />
                <SIP 
                    SIPState={SIPState} 
                    setSIPState={setSIPState} 
                    setIsDisabled={setIsDisabled}
                    type="edit" />
                <Notes 
                    notesState={notesState} 
                    setNotesState={setNotesState} 
                    setIsDisabled={setIsDisabled}
                    type="edit" />
                <Field 
                    fieldState={fieldState} 
                    setFieldState={setFieldState} 
                    setIsDisabled={setIsDisabled}
                    type="edit" />
            </React.Fragment>
            :<React.Fragment />}
            <Grid container lg={6} md={7} sm={9} xs={11}direction="row" alignItems="stretch" className={classes.fields}>
                <Grid item xs={2} sm={1}>
                <IconButton
                    edge="start"
                    aria-label="menu"
                    className={classes.icon}
                    >
                    <Tooltip title="Id">
                        <ViewAgendaOutlinedIcon />
                    </Tooltip>
                </IconButton>
                </Grid>
                <Grid item xs={10} sm={11}>
                <NumberTextValidator
                    required={true}
                    name="id"
                    value={employee.id} 
                    label="Id" 
                    onChange={e => handleChange(e)} />
                </Grid>
                <Grid item xs={2} sm={1}>
                <IconButton
                    edge="start"
                    aria-label="menu"
                    className={classes.icon}
                    >
                    <Tooltip title="Civil Id">
                        <ViewAgendaOutlinedIcon />
                    </Tooltip>
                </IconButton>
                </Grid>
                
                <Grid item xs={10} sm={11}>
                <NumberTextValidator 
                    required={true}
                    name="civilId"
                    value={employee.civilId} 
                    onChange={e => handleChange(e)} 
                    label="Civil Id" />
                </Grid>
            </Grid>
            <div className={classes.radio}>
            <FormLabel htmlFor="status">Status</FormLabel>
            <RadioGroup 
                required={true}
                aria-label="gender" 
                name="status" 
                id="status" 
                className={classes.radio}
                value={employee.status}
                onChange={e => handleChange(e)}>
                <FormControlLabel value="Active" control={<Radio />} label="Active" />
                <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
            </RadioGroup>
            </div>
            {/*!employee.fields ?<div></div>:
                <EditFields fields={employee.fields} changeField={changeField} changeFieldRequired={changeFieldRequired} deleteField={deleteField}/>
            */}
            <Button
                variant="contained"
                className={classes.showMoreButton}
                startIcon={expand?<ExpandLessIcon />:<ExpandMoreIcon />}
                size="small"
                onClick={()=>{setExpand(!expand)}}
                color="primary"
            >{!expand?"Show more":"Show less"}</Button>
            <br />
            
        </ValidatorForm>
        
        <br />

        </Grid>
        </Grid>
        }
    </div>
    );
}
export default AddEmployee;