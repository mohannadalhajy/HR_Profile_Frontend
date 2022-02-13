import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm, usePlugin, useScreenPlugin } from 'tinacms';
import EditButton from './EditButton';
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import Fab from '@material-ui/core/Fab';
import { useCMS } from 'tinacms';
import { Button } from '@material-ui/core'
import { LandingURL, BackgroundImagesURL, LOGIN_ROUTE } from '../../constants/index';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SaveIcon from '@material-ui/icons/Save';
import {
  Hero,
  HeroTemplate,
  LinkButton,
  LinkButtonTemplate,
  Button1,
  Button1Template,
  Paragraph,
  ParagraphTemplate,
  ImageList,
  ImageListTemplate,
  FeatureList,
  FeatureListTemplate
} from './Heading';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import getStyle from './getStyle';
import { profileMe } from '../../Redux/Profile/ProfileActions';
const { TINA_UPLOAD_IMAGE_API_URL } = require('../../constants/index');
const client = require('../../API/client')
const useStyles = makeStyles((theme) => getStyle());
//const clientEmployee =require ('../API/clientEmployee');
const axios = require('axios');
const ScreenPlugin = {
  name: 'Change Background',
  Component() {
    const classes = useStyles();
    const [imageError, setImageError] = useState("");
    const [srcImage, setSrcImage] = useState('/assets/upload.png');
    const path = require('path');
    const UploadImage = (e) => {
      if (e === undefined) { return; }
      const extension = path.extname(e.name);
      if (extension !== ".jpeg" && extension !== ".png" && extension !== ".jpg") {
        setImageError("This extension is not allowed\nchoose(jpeg,jpg,png)");
        return;
      }
      setImageError("Wait please");
      setSrcImage('/assets/waiting.jpg');
      let formData = new FormData();
      formData.append("image", e);
      const response = client.upload_image(TINA_UPLOAD_IMAGE_API_URL, formData);
      const promise = response;
      promise.then(
        res => {
          setSrcImage(BackgroundImagesURL + '/' + res.name);
          setImageError("Success");
        }
      ).catch(err => {
        setImageError("Try again please");
        setSrcImage('/assets/upload.png');
      });
    }

    return (
      <div>
        <Button
          variant="contained"
          component="label"
          className={classes.buttonUpload}
          onMouseEnter={() => {
            if (imageError !== 'Success' && imageError !== 'Wait please') {
              setSrcImage('/assets/upload.png');
            }
          }}
          onMouseLeave={() => {
            if (imageError !== 'Success' && imageError !== 'Wait please') {
              setSrcImage('/assets/upload.png');
            }
          }}
        >
          <img
            alt="Employee"
            className={classes.imgProfile}
            src={srcImage}
          />

          <input
            type="file"
            name="image"
            hidden
            onChange={e => UploadImage(e.target.files[0])}
          />
        </Button>
        {imageError !== 'Success' && imageError !== 'Wait please' ? <span style={{ color: "red" }}>{imageError}</span> : <div>your Background image is updated<br />Please refresh page</div>}
      </div>
    );
  },
  Icon: () => <span>🦙</span>,
  layout: 'popup'
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function PageContent() {
  const classes = useStyles();
  const [SnackbarState, setSnackbarState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
    severity: "error",
    message: "",
  });
  let history = useHistory();
  const dispatch = useDispatch();
  const admin = useSelector(state => state.Admin);
  const [logo,] = useState('/assets/logo1.png');
  // 2. Define the form configuration object
  const formConfig = {
    id: 'tina-tutorial-index',
    label: 'Edit Page',
    fields: [
      {
        name: 'title',
        label: 'Title',
        component: 'text',
      }
    ],
    //---initialValues: pageData,
    loadInitialValues() {
      return client.get(LandingURL).then((response) => response.data).then(res => { console.log("hhhh", res); return res.json }).catch(err => { console.log("hhhh", err) });
    },

    onSubmit(formData) {
      setSnackbarState({ ...SnackbarState, message: "Wait please", open: true, severity: "info" })
      const promise = axios.patch(LandingURL, JSON.stringify(formData), {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      promise.then(response => response.json())
        .then(data => console.log(data))
        .catch(err => {
          //console.log("errrrrr",err.response);
          if (err.response !== undefined)
            setSnackbarState({ ...SnackbarState, message: "Please Add Employee Button", open: true, severity: "error" })
          else
            setSnackbarState({ ...SnackbarState, message: "Success", open: true, severity: "info" })
        })
      return promise;
      // .catch(e => setSnackbarState({ ...SnackbarState,message:"message",open:true}))//console.error(e))
    }

  }

  const SnackbarClose = () => {
    setSnackbarState({ ...SnackbarState, open: false })
  }


  const PAGE_BLOCKS = {
    Hero: {
      Component: Hero,
      template: HeroTemplate,
    },
    LinkButton: {
      Component: LinkButton,
      template: LinkButtonTemplate
    },
    Button: {
      Component: Button1,
      template: Button1Template,
    },
    Image: {
      Component: ImageList,
      template: ImageListTemplate,
    },
    Paragraph: {
      Component: Paragraph,
      template: ParagraphTemplate,
    },
    FeatureList: {
      Component: FeatureList,
      template: FeatureListTemplate,
    }
  };
  const [, form] = useForm(formConfig)
  usePlugin(form)
  const cms = useCMS();
  useScreenPlugin(ScreenPlugin);

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken)
      dispatch(profileMe);
    else history.push(LOGIN_ROUTE);
  }, [dispatch, history]);

  return (
    <div>
      {admin.admin.email === undefined && !admin.loading ? history.push(LOGIN_ROUTE) :
        <div className={classes.root}>
          <Snackbar open={SnackbarState.open} anchorOrigin={{ vertical: SnackbarState.vertical, horizontal: SnackbarState.horizontal }} autoHideDuration={6000} >
            <Alert onClose={SnackbarClose} severity={SnackbarState.severity}>
              {SnackbarState.message}
            </Alert>
          </Snackbar>

          <InlineForm form={form}>
            <section className="App-header">
              <img className={classes.images} src={logo} alt="logo" />
              <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
            </section>
            <EditButton />

            {cms.enabled && !form.pristine ?
              <Fab color="secondary" className={classes.SaveButton} aria-label="edit" onClick={() => form.submit()}>
                <SaveIcon />
              </Fab> : <div />
            }
            {cms.enabled && !form.pristine ?
              <Fab color="secondary" className={classes.ResetButton} aria-label="edit" onClick={() => form.reset()}>
                <RotateLeftIcon />
              </Fab> : <div />
            }
          </InlineForm>

        </div>}
    </div>
  );
}
export default PageContent;