import React, { useState,useEffect } from 'react';
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
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {EMPLOYEES_Details_ROUTE, LOGIN_ROUTE} from '../../constants/index';
import {IMAGES_API_URL} from '../../constants/index';
import { editEmployees, initEditEmployees } from '../../Redux/Employees/EmployeeActions';
import BaseUploadImage from '../Base/BaseUploadImage';
import NumberTextValidator from '../Base/NumberTextValidator';
import Name from './SubEmployees/Name';
import Email from './SubEmployees/Email';
import Phone from './SubEmployees/Phone';
import Organization from './SubEmployees/Organization';
import Address from './SubEmployees/Address';
import IMAccount from './SubEmployees/IMAccount';
import WebAddress from './SubEmployees/WebAddress';
import SIP from './SubEmployees/SIP';
import RelationShip from './SubEmployees/Relationship';
import Notes from './SubEmployees/Notes';
import Event from './SubEmployees/Event';
import Field from './SubEmployees/Field';
import BaseWaiting from '../Base/BaseWaiting';
const clientEmployee =require ('../../Redux/Employees/clientEmployee');
const clientResponse =require ('../../Redux/Responses/clientResponse');
const useStyles = makeStyles((theme) => ({
    root: {
        padding:"0 8px",
        display: 'flex',
        '& > *': {
            marginTop: theme.spacing(2),
        },    
        flexGrow: 1,
    },
    fields: {
        margin: "10px 0px 20px 20px",
    },
    radio:{
        marginLeft: "20px"
    },
    icon: {
      marginTop:"10px",
      marginBottom:"10px"
    },
    showMoreButton:{
        backgroundColor:"#1a73e8",
        textTransform:"none",
        color:"white",
        "&:hover": {
        backgroundColor:"#1a73e8",
        marginLeft: "20px"
        }
    }
  }));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function EditEmployee() {
    let history = useHistory();
    const classes = useStyles();
    const admin = useSelector(state => state.Admin);
    const employees = useSelector(state => state.Employees);
    const [expand,setExpand] = useState(false)
    const [srcImage,setSrcImage] = useState(process.env.PUBLIC_URL + '/assets/profile.png');
    const dispatch = useDispatch();
    const location = useLocation();
    const [error,setError] = useState('Please wait');
    const [SnackbarState, setSnackbarState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        severity: "error",
        message: "",
    });
    const [loading, setLoading] = useState(true)
    const [phoneState, setPhoneState] = useState({items:[]})
    const [relationshipState, setRelationshipState] = useState({items:[]})
    const [eventState, setEventState] = useState({items:[]})
    const [IMState, setIMState] = useState({items:[]})
    const [webAddressState, setWebAddressState] = useState({items:[]})
    const [SIPState, setSIPState] = useState({items:[]})
    const [notesState, setNotesState] = useState({items:[]})
    const [emailState, setEmailState] = useState({items:[]})
    const [addressState, setAddressState] = useState({items:[]})
    const [fieldState, setFieldState] = React.useState({items:[]})
    const [organizationState, setOrganizationState] = useState({jobTitle:"",department:"",company:"",display:false})
    //const [existFields,setExistFields] = useState([])
    const [nameState, setNameState] = useState({});
    const [isDisabled,setIsDisabled] = useState(true)
    const [employee, setEmployee] = useState({
        id: "",
        civilId:"",
        status: "Active",
        image: "",
        qrcode: "",
        fields: []
    });
    
    useEffect(()=>{
        setLoading(true)
        var str = location.search;
        var id = str.substring(1);
        const promise = clientEmployee.getById(id);
        promise.then(res => {
            setPhoneState({items:res.data.result.phone});
            setEmployee(res.data.result);
            setNameState(res.data.result.name);
            setOrganizationState(res.data.result.organization);
            setEmailState({items:res.data.result.email});
            setFieldState({items:res.data.result.fields});
            setAddressState({items:res.data.result.address})
            setIMState({items:res.data.result.IMAccount})
            setWebAddressState({items:res.data.result.website})
            setEventState({items:res.data.result.event})
            setRelationshipState({items:res.data.result.relationship})
            setSIPState({items:res.data.result.SIP})
            setNotesState({items:[{info:res.data.result.notes}]});
            setLoading(false)
            if(res.data.result.image) setSrcImage(IMAGES_API_URL+'/'+res.data.result.image);
        }).catch(
            err => {
                const promise1 = clientResponse.getByCode(err.response.data.error.message.code);
                promise1.then( res => {
                    setError(res.data.message)
                })
            }
        );
    },[location]);
    

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
    
    /*const changeFieldRequired = (name) => {
        employee.fields.forEach(element => {
            if(element.name === name){
                element.isRequired = !element.isRequired;
                setEmployee({...employee})
                return;
            }
        });
    }*/
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
  

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
        setIsDisabled(false)
      };

    const handleChangeSwitch = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.checked });
        setIsDisabled(false)
    };
    const EditClick = () => {
        setSnackbarState({...SnackbarState,open:true})
        var str = location.search;
        var pos = str.substring(1);
        dispatch(editEmployees({
            "id":pos,
            "body":{...employee, 
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
                notes:notesState.items.length!==0?notesState.items[0].info:""}
        }));
    }
    const setImage = (image) => {
        setEmployee({ ...employee, image });
        setIsDisabled(false)
    }
    

    /*const deleteField = (name) => {
        setEmployee({...employee,fields:employee.fields.filter(element => element.name!==name)})
    }*/
    const moveToDetails = () => {
        history.push(EMPLOYEES_Details_ROUTE + '?' + employee._id)
        dispatch(initEditEmployees)
    }
    return (
        <div  className={classes.root}>
        {admin.admin.email===undefined && !admin.loading?history.push(LOGIN_ROUTE):
        !loading?
        <Grid container direction="row" justify="center" alignItems="stretch" className={classes.first}>
        <Grid item xs={12}>
        {employees.error==="edited"?moveToDetails():<React.Fragment />}
        <Snackbar open={SnackbarState.open&&(employees.loading||employees.error!=="")} anchorOrigin={{ vertical:SnackbarState.vertical, horizontal:SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={employees.error?"error":"info"}>
                {employees.error?employees.error:"Please Wait"}
            </Alert>
        </Snackbar>            
        <ValidatorForm
            component="fieldset" 
            onSubmit={EditClick}
            encType="multipart/form-data">
            <BaseUploadImage
                employee={employee}
                ChangeSwitchField={ChangeSwitchField}
                handleChangeSwitch={handleChangeSwitch}
                name={employee.name.prefix+" "+
                        employee.name.first+" "+
                        employee.name.middle+" "+
                        employee.name.last+" "+
                        employee.name.suffix}
                id={employee._id}
                setImage={setImage}
                isDisabled={isDisabled}
                type="Edit"
                image={employee.image}
                srcImage={srcImage}
                setSrcImage={setSrcImage}
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
                <FormLabel for="status">Status</FormLabel>
                <RadioGroup 
                    required aria-label="gender" 
                    name="status" id="status"
                    className={classes.radio}
                    value={employee.status}
                    onChange={e => handleChange(e)}>
                    <FormControlLabel value="Active" control={<Radio />} label="Active" />
                    <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                </RadioGroup>
            </div>
            <Button
                variant="contained"
                className={classes.showMoreButton}
                startIcon={expand?<ExpandLessIcon />:<ExpandMoreIcon />}
                size="small"
                onClick={()=>{setExpand(!expand)}}
                color="primary"
            >{!expand?"Show more":"Show less"}</Button>
            
            <br />
            <br />
            

            <br />
        </ValidatorForm>
        
        </Grid>
        </Grid>
        :
        <BaseWaiting error={error}/>
        }
        </div>
        );
    }


export default EditEmployee;
