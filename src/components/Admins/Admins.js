import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { ADD_ADMIN_ROUTE, EDIT_ADMIN_ROUTE, LOGIN_ROUTE } from '../../constants/index';
import {
  deepOrange,
  deepPurple,
  red,
  pink,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  brown,
  grey,
  blueGrey
} from '@material-ui/core/colors';
import { deleteAdmin, getAdminsByTenant } from '../../Redux/Admins/Actions';
const useStyles = makeStyles((theme) => ({
  selected: {
    display: 'block'
  },
  unselected: {
    display: 'none'
  },
  button: {
  },
  displayHover: {
    display: 'revert',
    "&:hover": {
      display: 'none'
    }
  },
  checkBox: {
    color: '#1a73e8',
    padding: "12px 0 8px 0"
  },
  tableCell: {
    color: 'inherit',
    textDecoration: 'inherit'
  },
  countRow: {
    fontSize: ".6875rem",
    color: "#5f6368",
    fontWeight: "500",
    padding: '10px',
    height: '20px',
    display: 'flex'
  },
  TableRow: {
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: "#f2f2f2"
    },
    "&:hover .actions": {
      opacity: "1"
    },
    "& .actions": {
      opacity: "0"
    },
    "&:hover .image": {
      display: "none"
    },
    "& .image": {
      display: "table-cell"
    },
    "&:hover .checkbox": {
      display: "table-cell"
    },
    "& .checkbox": {
      display: "none"
    },
    "& .hideImage": {
      display: "none"
    }
  },
  button1: {
    padding: '10px 16px',
    borderRadius: '50px',
    position: 'relative',
    overflow: 'hidden',
    margin: '10px',
    fontSize: '16px',
    fontFamily: 'philosopher',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    borderColor: 'darkgray',
    border: '1px solid',
    "&:hover": {
      boxShadow: '0px 1px 3px 0px rgba(60,64,67,0.302),0 4px 8px 3px rgba(60,64,67,0.149)',
    }
  },
  selectedCell: {
    fontSize: '.875rem',
    fontWeight: '500px',
    color: '#1a73e8',
    whiteSpace: 'nowrap',
    fontFamily: 'Google Sans, Roboto,Arial,sans-serif'
  },
  deepOrange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
  indigo: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  blue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
  },
  lightBlue: {
    color: theme.palette.getContrastText(lightBlue[500]),
    backgroundColor: lightBlue[500],
  },
  cyan: {
    color: theme.palette.getContrastText(cyan[500]),
    backgroundColor: cyan[500],
  },
  teal: {
    color: theme.palette.getContrastText(teal[500]),
    backgroundColor: teal[500],
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
  },
  lightGreen: {
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[500],
  },
  lime: {
    color: theme.palette.getContrastText(lime[500]),
    backgroundColor: lime[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  amber: {
    color: theme.palette.getContrastText(amber[500]),
    backgroundColor: amber[500],
  },
  orange: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
  },
  brown: {
    color: theme.palette.getContrastText(brown[500]),
    backgroundColor: brown[500],
  },
  grey: {
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
  },
  blueGrey: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[500],
  }
}));
function Admins({tenantId}) {
  const dispatch = useDispatch();
  const [ItemIdDelete, setItemIdDelete] = useState("");
  const [tenantIdDelete, setTenantIdDelete] = useState("");
  const [openDeleteOne, setOpenDeleteOne] = useState(false);
  const classes = useStyles();

  const colors = [
    classes.red,
    classes.purple,
    classes.pink,
    classes.indigo,
    classes.blue,
    classes.teal,
    classes.green,
    classes.yellow,
    classes.lightBlue,
    classes.amber,
    classes.orange,
    classes.deepOrange,
    classes.lime,
    classes.cyan,
    classes.brown,
    classes.grey,
    classes.lightGreen,
    classes.blueGrey,
  ]
  const Admins = useSelector(state => state.Admins);
  const admin = useSelector(state => state.Admin);
  let history = useHistory();

  useEffect(() => {
    dispatch(getAdminsByTenant(tenantId?tenantId:""));
  }, [dispatch, tenantId])

  const handleCloseDeleteOne = () => {
    setOpenDeleteOne(false);
  };
  const handleOpenDeleteOne = () => {
    setOpenDeleteOne(true);
  };

  return (
    <div>

      {admin.admin.email === undefined && !admin.loading ? history.push(LOGIN_ROUTE) :

        <div >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow role="checkbox">
                  <TableCell size='small' padding='checkbox' />
                  <TableCell align="left">email</TableCell>
                  <TableCell align="left" size='small'></TableCell>
                  <TableCell align="right" size='small'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Admins.admins.map((item, index) => (
                  <TableRow
                    role="checkbox"
                    hover
                    classes={{
                      root: classes.TableRow
                    }}
                    key={item._id}>
                    <TableCell size='small' padding='checkbox'>
                      <Avatar className={colors[index % colors.length]}>{item.email[0]}</Avatar>
                    </TableCell>

                    <TableCell
                      align="left"
                      className={classes.tableCell}
                    >{item.email}</TableCell>
                    <TableCell align="left" size='small'>
                      <IconButton
                        size="small"
                        className={classes.button}
                        onClick={() => {
                          setItemIdDelete(item._id);
                          setTenantIdDelete(item.tenantId);
                          handleOpenDeleteOne();
                        }}>
                        <Tooltip title="Delete"><DeleteIcon /></Tooltip>
                      </IconButton>
                    </TableCell>
                    <TableCell align="left" size='small'>
                      <Link
                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                        to={EDIT_ADMIN_ROUTE + '?&id=' + item._id + '&tenantId=' + item.tenantId}>
                        <IconButton
                          className={classes.button}>
                          <Tooltip title="Edit"><EditIcon size="small" /></Tooltip>
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_ADMIN_ROUTE}>

            <Button startIcon={<AddIcon />} className={classes.button1}>
              Add Admin
            </Button>
          </Link>
          <Dialog
            open={openDeleteOne}
            onClose={handleCloseDeleteOne}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this Employee?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteOne} color="primary">
                No
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteAdmin(tenantIdDelete,ItemIdDelete));
                  handleCloseDeleteOne();
                }}
                color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      }
    </div>);
}
export default Admins;