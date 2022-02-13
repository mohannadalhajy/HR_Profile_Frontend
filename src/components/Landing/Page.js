import React, { useState } from 'react';
import { useForm, usePlugin } from 'tinacms';
import { InlineForm, InlineBlocks } from 'react-tinacms-inline'
import { LandingURL } from '../../constants/index';
import { makeStyles } from '@material-ui/core/styles';

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
} from './Heading'
import getStyle from './getStyle';
const useStyles = makeStyles((theme) => (getStyle()));
const client = require('../../API/client')

function Page() {
  const classes = useStyles();
  const [logo,] = useState('/assets/logo1.png');
  /*const ContentBlock = {
    label: 'Content',
    key: 'content-block',
    defaultItem: {
      content: '',
    },
    fields: [{ name: 'content', label: 'Content', component: 'markdown' }],
  }*/
 
  
    // 2. Define the form configuration object
  const formConfig = {
    loadInitialValues() {
      return client.get(LandingURL).then((response) => response.data).then(res=>{console.log("hhhh",res);return res.json}).catch(err=>{console.log("hhhh",err)});
    }
  }

  const PAGE_BLOCKS = {
    Hero : {
      Component: Hero,
      template: HeroTemplate,
    },
    LinkButton: {
      Component: LinkButton,
      template : LinkButtonTemplate
    },
    Button : {
      Component: Button1,
      template: Button1Template,
    },
    Image : {
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
  // 3. Create the form
  const [, form] = useForm(formConfig)
  // 4. Register it with the CMS
  usePlugin(form)
  return (
    <div className={classes.root}>
      {console.log("hhhhform",form.initialValues)}
      <InlineForm form={form}>
        <section className="App-header">
          <img className={classes.images} src={logo}  alt="logo" />
          <InlineBlocks name="blocks" blocks={PAGE_BLOCKS} />
        </section>
      </InlineForm>
    </div>
  );
}
export default Page;