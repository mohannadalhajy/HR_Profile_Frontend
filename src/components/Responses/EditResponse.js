import React from 'react';
import {
  Grid,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { editResponses } from '../../Redux/Responses/ResponseActions';
import { useDispatch, useSelector } from 'react-redux';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/home.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#218490',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    '& > *': {
      marginTop: theme.spacing(2),
    },
    flexGrow: 1,
  },
  card: {
    //margin:"25px",
    //maxHeight:'500px',
    //maxWidth:'500px',
    textAlign: 'center'
  },
  buttonUpload: {
    width: '200px',
    height: '200px',
    borderRadius: '100px'
  },
  imgProfile: {
    width: '200px',
    height: '200px',
    margin: '10px 20px',
    borderRadius: '100px',
  },
  labelProfile: {
    fontSize: '2em',
    fontWeight: 'bold',
    marginBottom: '10px',
    fontFamily: 'Hind Guntur, sans-serif',
    color: '#054231'
  },
  labelDetails: {
    fontSize: '1em',
    fontFamily: 'Hind Guntur, sans-serif',
    color: '#054231'
  },
  radio: {
    alignItems: 'center'
  },
  disableTransform: {
      textTransform: 'none'
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    color: "white",
    marginTop:"10px",
    textTransform: 'none',
    "&:hover": {
      backgroundColor:"#1a73e8",
    }
  }
}));

//const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
function EditResponse({open, setOpen, response, setResponse}) {
  const classes = useStyles();
  const admin = useSelector(state => state.Admin);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false)
  };    
  
  const handleChange = (e) => {
    setResponse({ ...response, [e.target.name]: e.target.value });
  };
  const EditClick = (e) => {
    const requestOptions = {
      "id": response._id,
      "body": response
    };
    dispatch(editResponses(requestOptions));
    setOpen(false)
  }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Edit Response</DialogTitle>
      <DialogContent>
        {admin.admin.email === undefined ? <div></div> :
          <Grid container direction="row" justify="center" alignItems="stretch">
            <Grid item>
              <div className={classes.card}>
                <div className={classes.labelProfile}>{response.address}</div>
                <ValidatorForm
                  component="fieldset"
                  dir="ltr"
                  onSubmit={e => { EditClick(e) }}
                  enctype="multipart/form-data">
                  <TextValidator
                    required
                    fullWidth
                    validators={['required', 'matchRegexp:^[a-z .,;@#$%^&*A-Z\u0621-\u064A]{2,200}$']}
                    errorMessages={['this field is required', 'Enter Text between 2 -> 200 letters']}
                    name="message"
                    id="message"
                    value={response.message}
                    onChange={e => handleChange(e)}
                    label="Message" />
                  <Button type="submit" color="primary" variant="contained" className={classes.saveButton}>Save</Button>
                </ValidatorForm>
              </div>
            </Grid>
          </Grid>
        }
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
          }}
          className={classes.disableTransform}
          color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default EditResponse;
