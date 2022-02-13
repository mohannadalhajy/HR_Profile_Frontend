import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEmployeesBySearch } from '../../Redux/Employees/EmployeeActions';
import { useHistory, useLocation } from 'react-router-dom';
import BaseEmployees from './BaseEmployees';
function EmployeesSearch() {
    const dispatch = useDispatch();
    const [countInPage, setCountInPage] = useState(50);
    const [currPage, setCurrPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const history = useHistory();
    const location = useLocation();
    const searchByText = () => {
        var str = location.search;
        let page = new URLSearchParams(str).get("page")
        let take = new URLSearchParams(str).get("take")
        let text = new URLSearchParams(str).get("text")
        if (!page || page <= 0) page = 1
        if (!take || take <= 0) take = countInPage
        if (!text) text = ""
        setSearchText(text)
        dispatch(getEmployeesBySearch({ search: text, page, take }));
        setCurrPage(page);
        setCountInPage(take);
    }
    useEffect(() => {
        searchByText()
        return history.listen((location) => {
            searchByText()
        })
    })


    const setEmployeesByPage = (page, take) => {
        if (take === undefined) take = countInPage;
        dispatch(getEmployeesBySearch({ search: searchText, page, take }));
        setCurrPage(page)
        history.push("?&page=" + page + "&take=" + take + "&text=" + searchText)
    }

    return (
        <BaseEmployees countInPage={countInPage} currPage={currPage} setEmployeesByPage={setEmployeesByPage} />
    );
}
export default EmployeesSearch;