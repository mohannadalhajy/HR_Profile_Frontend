import React from "react";
import {
  PREFIX,
  SUPER_ADMINS_ROUTE,
  TENANTS_ROUTE,
  ADD_ADMIN_ROUTE
} from '../../constants/index';
import {
  MenuItem,
  Button,
  IconButton} from "@material-ui/core";
import { Link, useLocation } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';

export default function SideBarSuperAdmin({classes}) {
  const location = useLocation();
  return (
    <div>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_ADMIN_ROUTE}>
        <MenuItem>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add user
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={TENANTS_ROUTE}>
        <MenuItem className={location.pathname === PREFIX||location.pathname === TENANTS_ROUTE? classes.employeesLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Tenants
        </MenuItem>
      </Link>
      
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={SUPER_ADMINS_ROUTE}>
        <MenuItem className={location.pathname === SUPER_ADMINS_ROUTE || location.pathname === PREFIX? classes.employeesLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Super admins
        </MenuItem>
      </Link>
           
    </div>
  );
}