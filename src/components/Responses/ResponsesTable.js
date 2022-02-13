import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import './ResponsesStyle.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import EditResponse from './EditResponse';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        },
        flexGrow: 1,
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#218490',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
    },
    pagination: {
        flexGrow: 1,
        maxWidth: 250,
        minWidth: 250,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    selected: {
        display: 'block'
    },
    unselected: {
        display: 'none'
    }
}));
const clientResponse = require('../../Redux/Responses/clientResponse');

function ResponsesTable() {
    const classes = useStyles();
    const [openEdit, setOpenEdit] = useState(false);
    const [response, setResponse] = useState(0);
    const Responses = useSelector(state => state.Responses);
    const initResponse = (id) =>{
        const promise = clientResponse.getById(id);
        promise.then(res => {
        setResponse(res.data);
        });
    }
    return (
        <div>
        {!Responses || Responses.responses.length <= 0 ? <div>{!Responses ? <div><h2>Loading...</h2></div> : <div></div>}</div> :
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Response</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Responses.responses.map(item => (
                            <TableRow
                                hover
                                className={classes.TableRow}
                                key={item._id}>
                                <TableCell>
                                {item.address}
                                </TableCell>
                                <TableCell>
                                {item.message}
                                </TableCell>
                                <TableCell>
                                <IconButton size="small" onClick={()=>{setOpenEdit(true);initResponse(item._id)}} color="primary">
                                    <Tooltip title="Edit"><EditIcon size="small"/></Tooltip>
                                </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            <EditResponse open={openEdit} setOpen={setOpenEdit} response={response} setResponse={setResponse}/>
        </div>
    )
}
export default ResponsesTable;