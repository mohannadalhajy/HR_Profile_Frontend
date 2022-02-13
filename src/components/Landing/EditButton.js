import React from 'react';
import { useCMS } from 'tinacms';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
const useStyles = makeStyles((theme) => ({
  FixedButton :{
    position: 'fixed',
    bottom: '25px',
    right: '50px'
}
}));

function EditButton() {
  const classes = useStyles();

  const cms = useCMS();
  return (
    <div>
      <Fab color="secondary"  className={classes.FixedButton} aria-label="edit" onClick={() => cms.toggle()}>
      {cms.enabled ? <CloseSharpIcon /> : <EditIcon />}
      </Fab>
    </div>
  );
}
export default EditButton;