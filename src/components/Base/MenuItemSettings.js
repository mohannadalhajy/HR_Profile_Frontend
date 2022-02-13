import React from 'react';
import {
  makeStyles,
  MenuItem,
  IconButton,
  Typography
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles((theme) => ({
  menuIcon: {
    minWidth: "0px",
    textTransform: "none",
    marginRight: "5px"
  }
}));

function MenuItemSettings({ setOpen }) {
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <MenuItem onClick={handleOpen}>

      <IconButton
        edge="start"
        aria-label="menu"
        className={classes.icon}
      >
        <SettingsIcon />
      </IconButton>
      <Typography variant="inherit">
        Settings
      </Typography>
    </MenuItem>
  );
}


export default MenuItemSettings;
