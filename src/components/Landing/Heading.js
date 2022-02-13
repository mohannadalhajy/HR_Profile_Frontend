import React from 'react';
import { BlocksControls, InlineTextarea, InlineBlocks, InlineImage } from 'react-tinacms-inline'
import { makeStyles } from '@material-ui/core/styles';
import { DETAILS_EMPLOYEE_URL, LANDING_BAGE, MediaURL } from '../../constants/index';
import { useCMS } from 'tinacms';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { Button } from '@tinacms/styles';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const classNames = require('classnames');
const big = "Big"
const middle = "Middle"
const small = "Small"

const start = 'Start'
const center = 'Center'
const end = 'End'
const spaceBetween = 'Space between'
const spaceAround = 'Space around'
const spaceEvenly = 'Space evenly'

const useStyles = makeStyles((theme) => ({
  images: {
    maxWidth: '300px',
    borderRadius: '10px',
    maxHeight: '300px'
  },
  button1: {
    backgroundImage: `url(https://kic-kw.com/assets/img/svg-mask.svg) !important`,

    backgroundColor: '#C2A377',
    borderColor: '#c38b3c',
    color: '#183861',

    padding: '19.5px 28.5px',
    borderRadius: '50px',
    backgroundSize: '100% 100%',
    fontWeight: 'bold',
    margin: '16px 0px 8px',
    lineHeight: '1',
    letterSpacing: '1.5px',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: '2px',
    fontSize: '16px',
    height: '70px',
    fontFamily: 'philosopher',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    border: '1px solid transparent',

    "&:hover": {
      borderColor: '#183861',
      backgroundColor: '#183861',
      color: '#C2A377',
    }
  },
  gridItem:{
    margin:'5px'
  }
}));


// Example 'Heading' Block
export function Hero({ data, index }) {
  return (
    <BlocksControls index={index}>
      <div style={{
        color: data.TextColor || '#0F0',
        backgroundColor: data.BackgroundColor || 'aliceblue',
        textAlign: data.Alignment,
        justifyContent: data.Alignment === 'left' ? 'start' : data.Alignment,
      }}>
        <h1><InlineTextarea name="text1" /></h1>
        <p><InlineTextarea name="text2" /></p>
      </div>
    </BlocksControls>
  )
}
export const HeroTemplate = {
  label: 'Hero',
  defaultItem: {
    text1: 'website ',
    text2: 'website ',
  },
  fields: [
    {
      name: 'BackgroundColor',
      label: 'Background Color',
      component: 'color',
    },
    {
      name: 'TextColor',
      label: 'Text Color',
      component: 'color',
    },
    {
      name: 'Alignment',
      label: 'Alignment',
      component: 'select',
      options: ['center', 'left', 'right'],
    }
  ],
}

export function LinkButton({ data, index }) {
  const classes = useStyles();

  return (
    <BlocksControls index={index}>
      <div style={{
        textAlign: data.Alignment,
        justifyContent: data.Alignment === 'left' ? 'start' : data.Alignment,
      }}>
        <a style={{ color: 'inherit', textDecoration: 'inherit' }} target="_blank" rel="noreferrer" href={(data.Link.slice(0, 4).localeCompare('http') === 0 ? '' : 'http://') + data.Link} >
          <Button className={classes.button1} variant="contained" >
            {data.Text}
          </Button>
        </a>
      </div>
    </BlocksControls>
  )
}
export const LinkButtonTemplate = {
  label: 'Link',
  defaultItem: {
    text: 'button',
    Link: 'www.google.com',
  },
  fields: [
    {
      name: 'Link',
      label: 'Link',
      component: 'text',
    },
    {
      name: 'Text',
      label: 'Text',
      component: 'text',
    },
    {
      name: 'Alignment',
      label: 'Alignment',
      component: 'select',
      options: ['center', 'left', 'right'],
    }
  ],
}


export function Button1(props) {
  const [id, setId] = useState();
  const [path, setPath] = useState();
  const location = useLocation();
  const classes = useStyles();
  useEffect(() => {
    var str = location.search;
    setPath(location.pathname.substring(1) === LANDING_BAGE ? '' : 'error');
    setId(str.substring(1));
  }, [location]);
  return (
    <BlocksControls index={props.index}>
      <div>
        {id || !path ?
          <Link style={{ color: 'inherit', textDecoration: 'inherit' }} target="_blank" to={{ pathname: DETAILS_EMPLOYEE_URL + id }} >
            <Button className={classes.button1} variant="contained" >
              معلومات الموظف
              <br></br>
              Employee Details
            </Button>
          </Link>
          : <div></div>}
      </div>
    </BlocksControls>
  )
}
export const Button1Template = {
  label: 'Employee Button',
  defaultItem: {
  },
  fields: [],
}
export function Feature({data, index}) {

  return (

    <Grid item xs={data.size===small?6:11} sm={data.size===small?6:11} md={data.size===small?4:data.size===middle?6:11} lg={data.size===small?3:data.size===middle?6:11}>
      <Card>
        <BlocksControls index={index}>
          <h3><InlineTextarea name="text1" /></h3>
          <p><InlineTextarea name="text2" /></p>
        </BlocksControls>
      </Card>
    </Grid>
  )
}
export const FeatureTemplate = {
  label: 'Feature',
  defaultItem: {
    text1: 'website ',
    text2: 'website ',
    size: small
  },
  fields: [
    {
      name: 'size',
      label: 'Size',
      component: 'select',
      options: [big,middle,small]
    }
  ],
}

export function FeatureList({data, index}) {
  const PAGE_BLOCKS = {
    Feature: {
      Component: Feature,
      template: FeatureTemplate,
    }
  }

  return (
    <BlocksControls index={index}>

      <InlineBlocks name="blocks" 
      className={classNames({
        "MuiGrid-container":true,
        "MuiGrid-align-items-xs-center":true,
        "MuiGrid-justify-content-xs-center":data.alignment===center,
        "MuiGrid-justify-content-xs-flex-end":data.alignment===end,
        "MuiGrid-justify-content-xs-space-between":data.alignment===spaceBetween,
        "MuiGrid-justify-content-xs-space-around":data.alignment===spaceAround,
        "MuiGrid-justify-content-xs-space-evenly":data.alignment===spaceEvenly
      })}
      direction="horizontal" blocks={PAGE_BLOCKS} />

    </BlocksControls>
  )
}
export const FeatureListTemplate = {
  label: 'Feature List',
  defaultItem: {
    text: 'website ',
    alignment: center
  },
  fields: [
    {
      name: 'alignment',
      label: 'Alignment',
      component: 'select',
      options: [start, center, end, spaceBetween, spaceAround, spaceEvenly],
    }
  ],
}
export function Paragraph({ data, index }) {
  return (
    <BlocksControls index={index}>
      <p style={{
        color: data.TextColor || '#0F0',
        backgroundColor: data.BackgroundColor || 'aliceblue',
        textAlign: data.Alignment,
        justifyContent: data.Alignment === 'left' ? 'start' : data.Alignment,
      }}
      ><InlineTextarea name="text" /></p>
    </BlocksControls>
  )
}
export const ParagraphTemplate = {
  label: 'Paragraph',
  defaultItem: {
    text: 'website ',
  },
  fields: [
    {
      name: 'BackgroundColor',
      label: 'Background Color',
      component: 'color',
    },
    {
      name: 'TextColor',
      label: 'Text Color',
      component: 'color',
    },
    {
      name: 'Alignment',
      label: 'Alignment',
      component: 'select',
      options: ['center', 'left', 'right'],
    }
  ],
}
export function Image({ data, index }) {
  const classes = useStyles();
  const cms = useCMS();
  return (
    <Grid item xs={data.size===small?6:11} sm={data.size===small?6:11} md={data.size===small?4:data.size===middle?6:11} lg={data.size===small?3:data.size===middle?6:11}>
        <BlocksControls index={index}>
          <InlineImage
            name="image1"
            children={image => <img max_width="100%" max_height="100%" alt={data.alt} className={classes.images} src={image.src} />}
            uploadDir={() => '/'}
            alt="hero-image"
            previewSrc={fieldValue => cms.media.previewSrc(`${fieldValue}`)}
            parse={media => MediaURL + `/${media.filename}`}
          />
        </BlocksControls>
    </Grid>

  )
}
export const ImageTemplate = {
  label: 'Image',
  defaultItem: {
    alt: "this is image",
    size: small
  },
  fields: [
    {
      name: 'alt',
      label: 'Image Alt',
      component: 'text',
    },
    {
      name: 'size',
      label: 'Size',
      component: 'select',
      options: [big,middle,small]
    }
  ],
}

export function ImageList({ data, index }) {
  const PAGE_BLOCKS = {
    Image: {
      Component: Image,
      template: ImageTemplate,
    }
  }

  return (
      <BlocksControls index={index}>
        {console.log("ddddd",data.alignment===center)}
        <InlineBlocks
          name="blocks"
          className={classNames({
            "MuiGrid-container":true,
            "MuiGrid-align-items-xs-center":true,
            "MuiGrid-justify-content-xs-center":data.alignment===center,
            "MuiGrid-justify-content-xs-flex-end":data.alignment===end,
            "MuiGrid-justify-content-xs-space-between":data.alignment===spaceBetween,
            "MuiGrid-justify-content-xs-space-around":data.alignment===spaceAround,
            "MuiGrid-justify-content-xs-space-evenly":data.alignment===spaceEvenly
          })}
          direction='horizontal'
          blocks={PAGE_BLOCKS} />
      </BlocksControls>
  )
}
export const ImageListTemplate = {
  label: 'Image list',
  defaultItem: {
    alignment: center
  },
  fields: [
    {
      name: 'alignment',
      label: 'Alignment',
      component: 'select',
      options: [start, center, end, spaceBetween, spaceAround, spaceEvenly],
    }
  ],
}

