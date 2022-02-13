import React, { useState } from "react";
import {
  DOWNLOAD_ERRORS_API_URL,
  EMPLOYEES_ROUTE,
  LANDING_BAGE_ROUTE,
  PREFIX,
  ADMINS_ROUTE
} from '../../constants/index';
import {
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton} from "@material-ui/core";
import { Link, useLocation } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import { useSelector } from 'react-redux';
import LinkIcon from '@material-ui/icons/Link';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import Responses from "../Responses/Responses";
import MenuItemDelete from "../Base/MenuItemDelete";
import DialogDelete from "../Base/DialogDelete";
import MenuItemExport from "../Base/MenuItemExport";
import DialogExport from "../Base/DialogExport";
import MenuItemSettings from "../Base/MenuItemSettings";
import DialogSettings from "../Base/DialogSettings";
import DialogImport from "../Base/DialogImport";

export default function SideBarAdmin({classes}) {
  const location = useLocation();
  const admin = useSelector(state => state.Admin);
  const Employees = useSelector(state => state.Employees);
  const [openImportVCard, setOpenImportVCard] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [importVCardErrors, setImportVCardErrors] = useState(false);
  const [open, setOpen] = useState(false)
  
  

  
  const closeImportVCard = () =>{
    setOpenImportVCard(false)
    setImportVCardErrors(false)
  }

  
  
  return (
    <div>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={PREFIX + "/addEmployee"}>
        <MenuItem>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add Employee
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={PREFIX + "/Employee"}>
        <MenuItem className={location.pathname === EMPLOYEES_ROUTE || location.pathname === PREFIX? classes.employeesLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Employees {Employees.count}
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/uibuilder">
        <MenuItem className={location.pathname === LANDING_BAGE_ROUTE ? classes.employeesLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <LinkIcon />
          </IconButton>
          Landing Page
        </MenuItem>
      </Link>
      <MenuItem onClick={()=>setOpen(true)}>
        <IconButton
          edge="start"
          aria-label="menu"
          className={classes.icon}
        >
          <MailOutlineIcon />
        </IconButton>
        Responses
      </MenuItem>
      <MenuItem onClick={() => setOpenImport(true)}>
        <IconButton
          edge="start"
          aria-label="menu"
          className={classes.icon}
        >
          <GetAppIcon />
        </IconButton>
        Import
      </MenuItem>
      <MenuItemExport setOpen={setOpenExport} sideBar={true}/>
      
      <MenuItemDelete setOpen={setOpenDelete} sideBar={true}/>
      <MenuItemSettings setOpen={setOpenSettings}/>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADMINS_ROUTE}>
        <MenuItem className={location.pathname === ADMINS_ROUTE || location.pathname === PREFIX? classes.employeesLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Admins
        </MenuItem>
      </Link>
      <Dialog
        open={openImportVCard}
        onClose={closeImportVCard}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Import Employees
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {importVCardErrors ? "There are errors,Do you want to download errors File?" : "Employees imported."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeImportVCard} color="primary">
            {importVCardErrors ? "No" : "Ok"}
          </Button>
          {importVCardErrors ?
            <a style={{ color: '#2962ff', textDecoration: 'inherit' }} href={DOWNLOAD_ERRORS_API_URL}>
              <Button
                onClick={closeImportVCard}
                color="primary" autoFocus>
                Yes
              </Button>
            </a> : <React.Fragment />}
        </DialogActions>
      </Dialog>
      {admin.admin.email === undefined ? <React.Fragment /> :<Responses open={open} setOpen={setOpen}/>}

      <DialogImport open={openImport} setOpen={setOpenImport} setImportVCardErrors={setImportVCardErrors} setOpenImportVCard={setOpenImportVCard} />
      <DialogDelete open={openDelete} setOpen={setOpenDelete} />
      
      <DialogSettings open={openSettings} setOpen={setOpenSettings} />

      <DialogExport open={openExport} setOpen={setOpenExport} />
      
      
    </div>
  );
}