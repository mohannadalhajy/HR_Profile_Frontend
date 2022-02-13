import React from 'react';
import { useSelector } from 'react-redux';
import { LOGIN_ROUTE } from '../../constants/index';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import BasicPagination from '../Base/BasicPagination';
import ListEmployee from './ListEmployee'
const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'65vh'
  },
}));
const BaseEmployees=({countInPage, currPage, setEmployeesByPage})=> {
  let history = useHistory();
  const employees = useSelector(state => state.Employees);
  const admin = useSelector(state => state.Admin);
  const classes = useStyles();
  return (<div >
    {admin.admin.email === undefined && !admin.loading ? history.push(LOGIN_ROUTE) :
      <div style={{ padding: "30px" }}>
        {!employees?<div></div>
        :employees.loading?<div className={classes.CircularProgress}>
        <CircularProgress />
      </div>
        :employees.employees.length <= 0?<div>There is not employees</div>
        :
        <React.Fragment>
          <ListEmployee />
          <br />
          <BasicPagination
                count={employees.pageCount}
                page={currPage}
                setPage={setEmployeesByPage} />
        </React.Fragment>
        }
      </div>
    }
  </div>);
}
export default BaseEmployees;
