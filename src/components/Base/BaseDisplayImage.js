import React, {useRef} from 'react';
import { 
  Button,
  Grid,
  IconButton,
  Box,
  Hidden,
  Menu,
  ListItemIcon,
  Typography,
  MenuItem,
  Divider,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
 } from '@material-ui/core';
import CropFreeIcon from '@material-ui/icons/CropFree';
import ViewAgendaOutlinedIcon from '@material-ui/icons/ViewAgendaOutlined';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import  { useReactToPrint }  from "react-to-print";
import GetAppIcon from '@material-ui/icons/GetApp';
import {LANDING_URL, PREFIX} from '../../constants/index';
import { Link } from "react-router-dom";
import Organization from '../Employees/SubEmployees/Organization';
import { deleteEmployee } from '../../Redux/Employees/EmployeeActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import MenuItemDelete from './MenuItemDelete';
const FileDownload = require('js-file-download');
const clientEmployee =require ('../../Redux/Employees/clientEmployee');
const useStyles = makeStyles((theme) => ({
  buttonUpload: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  first: {
    paddingBottom:"8px"
  },
  labelFirst: {
    display: 'flex',
    justifyContent:'left',
    alignItems:'center'
  },
  closeLink: {
    margin:"4px"
  },
  edit: {
    display: 'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end',
  },
  name: {
    justifyContent:'left',
    alignItems:'center',
    margin:"5px",
    marginTop:"10px",
    fontSize:"1.75rem"
  },
  organization: {
    justifyContent:'left',
    alignItems:'center',
    margin:"5px",
    fontSize:"1.125rem"
  },
  nameXS: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:"5px",
    fontSize:"1.75rem"
  },
  organizationXS: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    margin:"5px",
    fontSize:"1.125rem",
  },
  saveButton:{
    backgroundColor:"#1a73e8",
    textTransform:"none",
    color:"white",
    "&:hover": {
      backgroundColor:"#1a73e8",
    }
  },
  menuIcon: {
    minWidth:"0px",
    textTransform:"none",
    marginRight:"5px"
  },
  hideText:{
    color:'white',
    border:'0px',
    height:'0.5px',
    width:'0.5px',
    margin:'0px',
    padding:'0px'
  }
}));


function BaseDisplayImage({srcImage, Id, name, organization, qrcode, changeViewEmployee, guest}) {   
  const classes = useStyles();
  let history = useHistory();
  const admin = useSelector(state => state.Admin);
  const dispatch = useDispatch();
  const componentPrintRef = useRef();
  const [openQR, setOpenQR] = React.useState(false);
  const textAreaRef = useRef(null);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handlePrint = useReactToPrint({
    content: () => componentPrintRef.current,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function copyToClipboard(e) {
    textAreaRef.current.value = LANDING_URL + Id;//window.location.href;
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  };

const handleClickOpenQR = () => {
    setOpenQR(true);
};

const handleCloseQR = () => {
setOpenQR(false);
};
const ClickDownloadvCard = () => {
  const promise = clientEmployee.download_vCard(Id);
  promise.then(res => {
      FileDownload(res.data, name+'.vcf');
  });
  }
  return (
    <Grid container md={12} direction="row" alignItems="stretch" className={classes.first}>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {admin.admin.email===undefined?<React.Fragment />:
          <React.Fragment>
            <MenuItem onClick={handlePrint}>
              <ListItemIcon className={classes.menuIcon}>
                <PrintIcon fontSize="small"/>
              </ListItemIcon>
              <Typography variant="inherit">
                Print
              </Typography>
            </MenuItem>
            <MenuItemDelete setOpen={setOpenDelete}/>
            <MenuItem onClick={handleClickOpenQR}>
              <ListItemIcon className={classes.menuIcon}>
                <CropFreeIcon fontSize="small"/>
              </ListItemIcon>
              <Typography variant="inherit">
                SHOW QR
              </Typography>
            </MenuItem>
            <MenuItem onClick={changeViewEmployee}>
              <ListItemIcon className={classes.menuIcon}>
                <ViewAgendaOutlinedIcon fontSize="small"/>
              </ListItemIcon>
              <Typography variant="inherit">
                {guest?"View as admin":"View as guest"}
              </Typography>
            </MenuItem>
          </React.Fragment>
        }
        <MenuItem onClick={ClickDownloadvCard}>
          <ListItemIcon className={classes.menuIcon}>
            <GetAppIcon fontSize="small"/>
          </ListItemIcon>
          <Typography variant="inherit">
            Download vCard
          </Typography>
        </MenuItem>
      </Menu>
      <Grid item xs={1} className={classes.closeLink}>
        <Box display="none">
            <img alt="QR_Code" ref={componentPrintRef} src={qrcode} />
        </Box>
        {admin.admin.email===undefined?<React.Fragment />:
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={PREFIX+"/Employee"}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              size="small"
              >
              <Tooltip title="Back">
                <ArrowBackIcon />
              </Tooltip>
            </IconButton>
          </Link>
        }
      </Grid>
      <Hidden smUp >
        <Grid item xs={7} className={classes.labelFirst}>
        </Grid>
        <Grid item xs={3} className={classes.edit}>  
          <IconButton
            size="small"
            color="primary"
            onClick={handleClick}>
            <Tooltip title="Options">
              <MoreVertIcon />
            </Tooltip>
          </IconButton>
          {admin.admin.email===undefined?<React.Fragment />:
            <Link 
            style={{ color: 'inherit', textDecoration: 'inherit'}} 
            to={PREFIX+'/editEmployee?'+Id}>
              <IconButton
                edge="start"
                color="primary"
                aria-label="menu"
                size="small"
                >
                <Tooltip title="Edit">
                  <EditIcon />
                </Tooltip>
              </IconButton>
            </Link>
          }
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={3} md={2} className={classes.buttonUpload}>
      <img src={srcImage} 
          alt="Profile"
          style={{
          width:'162px',
          height:'162px',
          margin:'10px 20px',
          borderRadius:'100px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%'
      }}/>
      </Grid>
      <Hidden smUp >
        <Grid item xs={12} className={classes.nameXS}>
          {name}
        </Grid>
        <Grid item xs={12} className={classes.organizationXS}>
        {organization?
              <Organization organizationState={organization} type="display"/>
              :<React.Fragment />}
        </Grid>
        
      </Hidden>
      
      <Hidden xsDown>
        <Grid item sm={5} md={6} className={classes.name}>
          <Grid container sm={12} className={classes.name}>
            {name}
          </Grid>
          <Grid container sm={12} className={classes.organization}>
            {organization?
              <Organization organizationState={organization} type="display"/>
              :<React.Fragment />}
          </Grid>
        </Grid>
        <Grid item sm={2} className={classes.edit}>
          <IconButton
            size="small"
            color="primary"
            onClick={handleClick}>
            <Tooltip title="Options">
              <MoreVertIcon />
            </Tooltip>
          </IconButton>
          {admin.admin.email===undefined?<React.Fragment />:
            <Link 
              style={{ color: 'inherit', textDecoration: 'inherit'}} 
              to={PREFIX+'/editEmployee?'+Id}>
              <Button type="submit" variant="contained" className={classes.saveButton}>Edit</Button>
            </Link>
          }
        </Grid>
      </Hidden>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this Employee?
        </DialogContentText>
        </DialogContent>
        <DialogActions>
                <Button onClick={handleCloseDelete} color="primary">
                  No
                </Button>
                <Button 
                  onClick={() => { 
                    dispatch(deleteEmployee(Id));
                    handleCloseDelete(); 
                    history.push(PREFIX+"/Employee");
                  }} 
                  color="primary" autoFocus>
                    Yes
                </Button>
              </DialogActions>
      </Dialog>
      
      <Dialog 
        open={openQR}
        onClose={handleCloseQR}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle  id="alert-dialog-title">{"QR"}
        </DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-description">
            <img alt="QR_Code" src={qrcode} />
            <div>
              <textarea
                className={classes.hideText}
                ref={textAreaRef}
                value='Some text to copy'
              />
            </div>
            <Button onClick={copyToClipboard/*navigator.clipboard.writeText(window.location.href)}*/} color="primary" autoFocus>
              Copy Link
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQR} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
    </Dialog>
    </Grid>
  );
}
export default BaseDisplayImage;
