import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { getEmployees } from '../../Redux/Employees/EmployeeActions';
import BaseEmployees from './BaseEmployees';

const Employees=()=> {
  let history = useHistory();
  const [countInPage, setCountInPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(()=>{
    var str = location.search;
    let page = new URLSearchParams(str).get("page")
    let take = new URLSearchParams(str).get("take")
    if(!page || page<= 0 ) page = 1
    if(!take || take<= 0 ) take = countInPage
    dispatch(getEmployees({page,take}));
    setCurrPage(page);
    setCountInPage(take);
  },[location,dispatch, countInPage])

  const setEmployeesByPage = (page, take) => {
    if(take=== undefined) take = countInPage;
    dispatch(getEmployees({page,take}));
    setCurrPage(page)
    history.push("?&page="+page+"&take="+take)
  }
  return (
  <BaseEmployees countInPage={countInPage} currPage={currPage} setEmployeesByPage={setEmployeesByPage} />
  );
}
export default Employees;
