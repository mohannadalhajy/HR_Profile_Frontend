import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectEmployee,
    SelectAll,
    deleteEmployee
} from '../../Redux/Employees/EmployeeActions';
import {
    makeStyles,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorIcon from '@material-ui/icons/Error';
import EditIcon from '@material-ui/icons/Edit';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { Link } from 'react-router-dom';
import { IMAGES_API_URL, PREFIX } from '../../constants/index';
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
import MenuItemDelete from '../Base/MenuItemDelete';
import MenuItemExport from '../Base/MenuItemExport';
import DialogDelete from '../Base/DialogDelete';
import DialogExport from '../Base/DialogExport';
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

function ListEmployee() {
    const dispatch = useDispatch();
    const [ItemIdDelete, setItemIdDelete] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openDeleteOne, setOpenDeleteOne] = useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [actions, setActions] = React.useState(null);

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
    const Employees = useSelector(state => state.Employees);
    const admin = useSelector(state => state.Admin);
    const [openExport, setOpenExport] = useState(false);
    const handleSelect = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const getDetailsRoute = (id) =>{
        return PREFIX + '/detailsEmployee?&id=' + id +"&tenant=" + admin.admin.tenantId
    }
    const handleActions = (event) => {
        setActions(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseActions = () => {
        setActions(null);
    };
    const handleOpenDeleteOne = () => {
        setOpenDeleteOne(true);
    };

    const handleCloseDeleteOne = () => {
        setOpenDeleteOne(false);
    };

    const toggleSelectALL = (checkType) => {
        dispatch(SelectAll(checkType))
    };
    return (
        <div >
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); toggleSelectALL(true); }}>All</MenuItem>
                <MenuItem onClick={() => { handleClose(); toggleSelectALL(false) }}>None</MenuItem>
            </Menu>

            <Menu
                id="simple-menu2"
                anchorEl={Employees.selectedCount !== 0 ? actions : handleCloseActions}
                keepMounted
                open={Boolean(actions)}
                onClose={handleCloseActions}>
                <MenuItemExport setOpen={setOpenExport} />
                <MenuItemDelete setOpen={setOpenDelete} />
            </Menu>
            <TableContainer>
                <Table>
                    <TableHead>
                        {Employees.selectedCount !== 0 ?
                            <TableRow role="checkbox">
                                <TableCell size='small'>
                                    {Employees.selectedCount === Employees.employees.length ?
                                        <IconButton
                                            className={classes.checkBox}
                                            onClick={() => toggleSelectALL(false)}>
                                            <CheckBoxIcon />
                                        </IconButton>
                                        : <IconButton
                                            className={classes.checkBox}
                                            onClick={() => toggleSelectALL(false)}>
                                            <IndeterminateCheckBoxIcon />
                                        </IconButton>}
                                    <IconButton
                                        className={classes.checkBox}
                                        onClick={handleSelect}>
                                        <ArrowDropDownOutlinedIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left" size='small'>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={handleActions}>
                                        <Tooltip title="More Actions">
                                            <MoreVertIcon />
                                        </Tooltip>
                                    </IconButton></TableCell>
                                <TableCell align="left" size='small'></TableCell>
                                <TableCell align="left" size='small'></TableCell>
                                <TableCell align="left" size='small'></TableCell>
                                <TableCell className={classes.selectedCell}>{Employees.selectedCount + " selected"}</TableCell>
                                <TableCell align="left" size='small'></TableCell>
                            </TableRow>
                            :
                            <TableRow role="checkbox">
                                <TableCell size='small' padding='checkbox'>
                                </TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Status</TableCell>
                                <TableCell align="left">Phone</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left" size='small'></TableCell>
                                <TableCell align="right" size='small'></TableCell>
                            </TableRow>
                        }
                        <TableRow classes={{ root: classes.countRow }}>
                            Employees<span>({Employees.count})</span>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Employees.employees.map((item, index) => (
                            <TableRow
                                role="checkbox"
                                hover
                                classes={{
                                    root: classes.TableRow
                                }}
                                selected={item.checked}
                                key={item._id}>
                                <TableCell size='small' padding='checkbox' class={item.checked ? "" : "checkbox"}>
                                    <Checkbox
                                        checked={item.checked}
                                        style={{ color: '#1a73e8' }}
                                        onChange={() => {
                                            dispatch(selectEmployee(item._id))
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                                </TableCell>
                                <TableCell size='small' padding='checkbox' class={item.checked ? "hideImage" : "image"}>
                                    {item.image ?
                                        <img src={IMAGES_API_URL + '/' + item.image} width="36px" alt="avatar" />
                                        :
                                        <Avatar className={colors[index % colors.length]}>{item.name.first[0]}</Avatar>
                                    }
                                </TableCell>

                                <TableCell
                                    align="left"
                                    className={classes.tableCell}
                                    component={Link}
                                    to={getDetailsRoute(item._id)}>
                                    {item.id && item.civilId ? "" :
                                        <IconButton
                                            color="secondary"
                                            className={classes.button}>
                                            <Tooltip title={"There is not " + item.id ? "Civil Id" : "id"}>
                                                <ErrorIcon />
                                            </Tooltip>
                                        </IconButton>
                                    }
                                    {item.name.first + " " + item.name.last}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.tableCell}
                                    component={Link}
                                    to={getDetailsRoute(item._id)}
                                >{item.status}</TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.tableCell}
                                    component={Link}
                                    to={getDetailsRoute(item._id)}>
                                    {item.phone[0].code + item.phone[0].info}</TableCell>
                                <TableCell
                                    className={classes.tableCell}
                                    align="left"
                                    component={Link}
                                    to={getDetailsRoute(item._id)}>
                                    {item.email[0].info}</TableCell>
                                <TableCell align="left" size='small' class="actions">
                                    <IconButton
                                        size="small"
                                        className={classes.button}
                                        onClick={() => {
                                            setItemIdDelete(item._id);
                                            handleOpenDeleteOne();
                                        }}>
                                        <Tooltip title="Delete"><DeleteIcon /></Tooltip>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left" size='small' class="actions">
                                    <Link
                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                        to={PREFIX + '/editEmployee?' + item._id}>
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
            <DialogDelete open={openDelete} setOpen={setOpenDelete} />
            <DialogExport open={openExport} setOpen={setOpenExport} />
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
                            dispatch(deleteEmployee(ItemIdDelete));
                            handleCloseDeleteOne();
                        }}
                        color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

        </div>);
}
export default ListEmployee;