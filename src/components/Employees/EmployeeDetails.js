import React,  { useState ,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Divider,
    Grid,
    makeStyles,
    IconButton,
    Button,
    Tooltip
} from '@material-ui/core';
import Email from './SubEmployees/Email';
import Phone from './SubEmployees/Phone';
import WebAddress from './SubEmployees/WebAddress';
import Address from './SubEmployees/Address';
import IMAccount from './SubEmployees/IMAccount';
import Relationship from './SubEmployees/Relationship';
import { useSelector } from 'react-redux';
import SIP from './SubEmployees/SIP';
import Notes from './SubEmployees/Notes';
import Event from './SubEmployees/Event'
import Field from './SubEmployees/Field'
import BaseDisplayImage from '../Base/BaseDisplayImage';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BaseWaiting from '../Base/BaseWaiting';
const {IMAGES_API_URL} = require ('../../constants/index');
const clientEmployee =require ('../../Redux/Employees/clientEmployee');
const clientResponse =require ('../../Redux/Responses/clientResponse');
const useStyles = makeStyles((theme) => ({
    root: {
        padding:"0 8px",
        display: 'flex',
        flexGrow: 1,
    },
    labelDetails:{
      fontSize:'1em',
      fontFamily:'Hind Guntur, sans-serif',
      color:'#054231'
    },
    card:{
        border:'1px solid #dadce0',
        borderRadius:"8px",
        marginBottom:"16px",
        maxWidth:'500px',
        padding:"20px",
        margin:"20px"
    },
    button:{
        backgroundColor:"#1a73e8",
        margin:"20px",
        color:"white",
        textTransform:"none"
    },
}));

function EmployeeDetails () {
    const [guest, setGuest] = React.useState(false);
    const classes = useStyles();
    const [employee,setEmployee] = useState();
    const waitText = 'Please wait'
    const [error,setError] = useState(waitText);
    const [srcImage,setSrcImage] = useState(process.env.PUBLIC_URL + '/assets/profile.png');
    const [currentDate,setCurrentDate] = useState();
    const location = useLocation();
    const admin = useSelector(state => state.Admin);
    const [expand, setExpand] = React.useState(false);
    const [id, setId] = React.useState(false);
    const [tenantId, seTenanttId] = React.useState(false);
    useEffect(()=>{
        var str = location.search;
        let id = new URLSearchParams(str).get("id")
        let tenantId = new URLSearchParams(str).get("tenant")
        setId(id);
        seTenanttId(tenantId);
        let promise;
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken) promise = clientEmployee.getById(id);
        else promise = clientEmployee.getByIdGuest(id, tenantId);
        promise.then(res => {
            setEmployee(res.data.result);
            if(res.data.result.image) setSrcImage(IMAGES_API_URL+'/'+res.data.result.image);
        }).catch(
            err => {
                if(err.response) {
                    const promise1 = clientResponse.getByCode(err.response.data.error.message.code);
                    promise1.then( res => {
                        setEmployee(undefined)
                        setError(res.data.message)
                    })
                }
                else {
                    setEmployee(undefined)
                    setError("Network failed")
                }
            }
        );
        var today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes();
        setCurrentDate(date)
    },[location]);
    
      
    const changeViewEmployee = () => {
        let promise;
        if(guest) promise = clientEmployee.getById(id);
        else promise = clientEmployee.getByIdGuest(id, tenantId);
        promise.then(res => {
            setEmployee(res.data.result);
            if(res.data.result.image) setSrcImage(IMAGES_API_URL+'/'+res.data.result.image);
        }).catch(
            err => {
                if(err.response) {
                    const promise1 = clientResponse.getByCode(err.response.data.error.message.code);
                    promise1.then( res => {
                        setEmployee(undefined)
                        setError(res.data.message)
                    })
                }
                else {
                    setEmployee(undefined)
                    setError("Network failed")
                }
            }
        );
        setGuest(!guest);
    }
    return <div className={classes.root}>
        
    {employee!==undefined?
    
        <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={12}>
        <div>
            <BaseDisplayImage 
                changeViewEmployee={changeViewEmployee}
                guest={guest}
                qrcode={employee.qrcode}
                srcImage={srcImage}
                Id={id}
                name={
                    (employee.name.prefix?employee.name.prefix+" ":"")+
                    (employee.name.first?employee.name.first+" ":"")+
                    (employee.name.middle?employee.name.middle+" ":"")+
                    (employee.name.last?employee.name.last+" ":"")+
                    (employee.name.suffix?employee.name.suffix+" ":"")
                    }
                organization={employee.organization}
                />
            <Divider variant="middle" />
            
            <div className={classes.card}>
                <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">
                    <Grid item xs={9} >
                        Employee Details
                    </Grid>
                    <Grid item xs={3} >
                        <IconButton
                            size="small"
                            onClick={()=>{setExpand(!expand)}}
                        >
                            {expand?
                            <Tooltip title="Show less">
                                <ExpandLessIcon />
                            </Tooltip>:
                            <Tooltip title="Show more">
                                <ExpandMoreIcon />
                            </Tooltip>}
                        </IconButton>
                    </Grid>
                </Grid>
                {employee.id?
                <div className={classes.labelDetails}><br />Id: {employee.id}</div>
                :<div></div>}
                {employee.civilId?
                <div className={classes.labelDetails}><br />Civil Id: {employee.civilId}</div>
                :<div></div>}
                {employee.email&&employee.email.length!==0?
                <Email type="display" emailState={employee.email}></Email>
                :<div></div>}
                {employee.phone&&employee.phone.length!==0?
                <Phone type="display" phoneState={employee.phone}></Phone>
                :<div></div>}
                {employee.address&&employee.address.length!==0?
                <Address expand={expand} type="display" addressState={employee.address}></Address>
                :<div></div>}
                {expand&&employee.event&&employee.event.length!==0?
                <Event type="display" eventState={employee.event}></Event>
                :<div></div>}
                {expand&&employee.website&&employee.website.length!==0?
                <WebAddress type="display" webAddressState={employee.website}></WebAddress>
                :<div></div>}
                {expand&&employee.relationship&&employee.relationship.length!==0?
                <Relationship type="display" relationshipState={employee.relationship}></Relationship>
                :<div></div>}
                {expand&&employee.IMAccount&&employee.IMAccount.length!==0?
                <IMAccount type="display" IMState={employee.IMAccount}></IMAccount>
                :<div></div>}
                {expand&&employee.SIP&&employee.SIP.length!==0?
                <SIP type="display" SIPState={employee.SIP}></SIP>
                :<div></div>}
                {expand&&employee.fields&&employee.fields.length!==0?
                <Field type="display" fieldState={employee.fields}></Field>
                :<div></div>}
                {expand&&employee.notes?
                <Notes type="display" notesState={employee.notes}></Notes>
                :<div></div>}
                <br></br>
                <div className={classes.labelDetails}>Valid till: {currentDate}</div>
            </div> 
        </div> 
        </Grid>
        </Grid>    
    
    :
    <div>
    <BaseWaiting error={error}/>
    {admin.admin.email===undefined||waitText===error?<React.Fragment />:
    
    <Button variant="contained" className={classes.button} onClick={changeViewEmployee}>
        {guest?"View as admin":"View as guest"}
    </Button>
    }
    </div>
    }
    </div>;
    }
export default EmployeeDetails;