import React, { useState } from 'react';
import {
  Button,
  Grid,
  IconButton,
  Hidden,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import Organization from '../Employees/SubEmployees/Organization';
import {IMAGES_API_URL} from '../../constants/index';
import DisplaySettingsDialog from '../Employees/SubEmployees/DisplaySettingsDialog';
const clientEmployee = require ('../../Redux/Employees/clientEmployee');
const path = require('path')
const useStyles = makeStyles((theme) => ({
  buttonUpload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgProfile: {
    width: '162px',
    height: '162px',
    margin: '10px 20px',
    borderRadius: '100px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/profile.png'})`,
  },
  first: {
    paddingBottom: "8px"
  },
  labelFirst: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  },
  closeLink: {
    margin: "4px"
  },
  save: {
    display: 'flex',
    justifyContent:'flex-end',
    alignItems:'flex-end',
    margin: "10px",
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    color: "white",
    textTransform: 'none',
    "&:hover": {
      backgroundColor:"#1a73e8",
    }
  },
  icon: {
    margin: "50px"
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
  
}));
const success = "success"

function BaseUploadImage({ type, srcImage, image, setImage, setSrcImage, isDisabled, name, employee, ChangeSwitchField, handleChangeSwitch}) {
  const classes = useStyles();
  let history = useHistory();
  const [imageError,setImageError] = useState("");
  const [tempImage,setTempImage] = useState("");
  const [srcTempImage,setSrcTempImage] = useState(process.env.PUBLIC_URL + '/assets/profile.png');
  const [maxSize,] = useState(1 * 1024 * 1024);
  const [openChoose, setOpenChoose] = useState(false)
  const UploadImage = (e) => {
    setImageError("");
    if (e === undefined) {
      return;
    }
    const extension = path.extname(e.name);
    if (extension !== ".jpeg" && extension !== ".png" && extension !== ".jpg") {
      setImageError("This extension is not allowed\nchoose(jpeg,jpg,png)");
      return;
    }
    if (e.size > maxSize) {
      setImageError("This image is not allowed\nImage size limit is 1 MegaByte");
      return;
    }
    setImageError("Wait please");
    setTempImage(process.env.PUBLIC_URL + '/assets/waiting.jpg');
    let formData = new FormData();
    formData.append("image", e);
    const promise = clientEmployee.upload_image(formData);
    promise.then(
      res => {
        setTempImage(res.data.result);
        setSrcTempImage(IMAGES_API_URL + '/' + res.data.result);
        setImageError(success);
      }
    ).catch(err => {
      setImageError("Try again please");
      setSrcTempImage(process.env.PUBLIC_URL + '/assets/profile.png');
    });
  }
  const deleteImage = () =>{
    setImage("")
    setSrcImage(process.env.PUBLIC_URL + '/assets/profile.png')
    setOpenChoose(false)
  }
  return (
    <Grid container md={12} direction="row" alignItems="stretch" className={classes.first}>
      <Grid item xs={1} className={classes.closeLink}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            size="small"
            onClick={history.goBack}
          >
            <Tooltip title="Cancel">
              <CloseIcon />
            </Tooltip>
          </IconButton>
      </Grid>
      <Hidden smUp>
        <Grid item xs={6} className={classes.labelFirst}>
          <div>{type} Employee</div>
        </Grid>
        <Grid item xs={3} className={classes.save}>
          <DisplaySettingsDialog employee={employee} ChangeSwitchField={ChangeSwitchField} handleChangeSwitch={handleChangeSwitch}/>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isDisabled} 
            className={classes.saveButton}>
            Save
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={3} md={2} className={classes.buttonUpload}>
        <div style={{
          width: '162px',
          height: '162px',
          margin: '10px 20px',
          borderRadius: '100px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          backgroundImage: `url(${srcImage})`,
        }}>
          <IconButton
            edge="start"
            component="label"
            aria-label="menu"
            className={classes.icon}
            onClick={() => setOpenChoose(true)}
          >
            <AddAPhotoOutlinedIcon />
          </IconButton>
        </div>
        {imageError !== success && imageError !== 'Wait please' ? <span style={{ color: "red" }}>{imageError}</span> : <div></div>}
      </Grid>
      <Hidden smUp>
        <Grid item xs={12} className={classes.nameXS}>
          {name}
        </Grid>
        <Grid item xs={12} className={classes.organizationXS}>
        {employee&&employee.organization?
              <Organization organizationState={employee.organization} type="display"/>
              :<React.Fragment />}
        </Grid>
        
      </Hidden>
      
      <Hidden xsDown>
        <Grid item sm={5} md={6} className={classes.name}>
          <Grid container sm={12} className={classes.name}>
            {name}
          </Grid>
          <Grid container sm={12} className={classes.organization}>
            {employee&&employee.organization?
              <Organization organizationState={employee.organization} type="display"/>
              :<React.Fragment />}
          </Grid>
        </Grid>
        
        <Grid item sm={2} className={classes.save}>
          <DisplaySettingsDialog employee={employee} ChangeSwitchField={ChangeSwitchField} handleChangeSwitch={handleChangeSwitch}/>
          <Button 
            type="submit"
            variant="contained"
            disabled={isDisabled}
            className={classes.saveButton}>
            Save
          </Button>
        </Grid>
      </Hidden>
      <Dialog
        open={openChoose}
        onClose={() => setOpenChoose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid container>
            <Grid item xs="10">
              Choose Image
            </Grid>
            <Grid item xs="2">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                size="small"
                onClick={() => {
                  setOpenChoose(false)
                }}
              >
                <Tooltip title="Cancel">
                  <CloseIcon />
                </Tooltip>
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{
              width: '162px',
              height: '162px',
              margin: '10px 20px',
              borderRadius: '100px',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
              backgroundImage: `url(${srcTempImage})`,
            }}>
              <IconButton
                edge="start"
                component="label"
                aria-label="menu"
                className={classes.icon}>
                <AddAPhotoOutlinedIcon />
                <input
                  type="file"
                  accept='image/*'
                  name="image"
                  onChange={e => UploadImage(e.target.files[0])}
                  hidden />
              </IconButton>
            </div>
            <br />
            {image!==""?<Button onClick={deleteImage}>Delete Image</Button>:<React.Fragment />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {imageError===success?<Button
            onClick={() => {
              setImageError("")
              setImage(tempImage);
              setSrcImage(srcTempImage);
              setOpenChoose(false);
              setSrcTempImage(process.env.PUBLIC_URL + '/assets/profile.png')
            }}
            color="primary" autoFocus>
            Ok
          </Button>:<React.Fragment />}
        </DialogActions>
      </Dialog>


    </Grid>

  );
}
export default BaseUploadImage;
