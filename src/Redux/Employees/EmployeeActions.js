import {
    FETCH_GET_ALL_EMPLOYEES_REQUEST,
    FETCH_GET_ALL_EMPLOYEES_SUCCESS,
    FETCH_GET_ALL_EMPLOYEES_FAILURE,
    FETCH_ADD_EMPLOYEE_FAILURE,
    FETCH_ADD_EMPLOYEE,
    FETCH_EDIT_EMPLOYEE,
    FETCH_INIT_EDIT_EMPLOYEE
} from './EmployeesActionTypes'
import getErrorMessage from "../../Errors";
const clientEmployee = require ('./clientEmployee');

export const getEmployeesRequestAction = () => {
    return {
      type: FETCH_GET_ALL_EMPLOYEES_REQUEST,
    };
};

export const getEmployeesSuccessAction = (result) => {
return {
    type: FETCH_GET_ALL_EMPLOYEES_SUCCESS,
    payload: result,
};
};


export const getEmployeesFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_EMPLOYEES_FAILURE,
        payload: error,
    };
};
export const addEmployeeFailureAction = (error) => {
    return {
        type: FETCH_ADD_EMPLOYEE_FAILURE,
        payload: error
    };
};

export const getEmployees = body => async (dispatch, getState) => {
    dispatch(getEmployeesRequestAction());

    const promise = clientEmployee.getByPage(body.page,body.take);

    promise.then((response) => {
        const employees = response.data.result.employees.map(item => {return { ...item, checked: false }});
        dispatch(getEmployeesSuccessAction({...response.data.result,employees:employees}));
    })
    promise.catch((error) => {
        let errorMsg = "error"
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Employees"//getErrorMessage(error.response.data.error.code);
        dispatch(getEmployeesFailureAction(errorMsg));
    });
};

export const getEmployeesBySearch = body => async (dispatch, getState) => {
    dispatch(getEmployeesRequestAction());

    const promise = clientEmployee.search(body);

    promise.then((response) => {
        const employees = response.data.result.employees.map(item => {return { ...item, checked: false }});
        dispatch(getEmployeesSuccessAction({...response.data.result,employees:employees}));
    })
    promise.catch((error) => {
        const errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Employees"//getErrorMessage(error.response.data.error.code);
        dispatch(getEmployeesFailureAction(errorMsg));
    });
};


export const createEmployees = body => async (dispatch, getState) =>{
    dispatch(getEmployeesRequestAction());
    const promise = clientEmployee.post(body);
    promise.then(
        res => {
            dispatch({ type: FETCH_ADD_EMPLOYEE, payload: res.data.result })
        }
    ).catch(err=>{
        const errorMsg = getErrorMessage(err.response.data.error.message.array_error[0].code)
        dispatch(addEmployeeFailureAction(errorMsg));
    });
};


export const editEmployees = options => async (dispatch, getState) =>{
    dispatch(getEmployeesRequestAction());
    const {id, body} = options;
    const promise = clientEmployee.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_EMPLOYEE, payload: res.data })
        }
    ).catch(err=>{
        const errorMsg = getErrorMessage(err.response.data.error.message.array_error[0].code);
        dispatch(addEmployeeFailureAction(errorMsg));
    });
};


export async function initEditEmployees(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_EMPLOYEE, payload: "" }) 
}
/*export async function getEmployees(dispatch, getState) {
    const promise = clientEmployee.get();
    promise.then(res =>  {
        const list = res.data.map(item => {return { ...item, checked: false }});
        dispatch({ type: 'getAllEmployees', payload: list }) 
    });
}*/


export const deleteEmployee = body => async (dispatch, getState) =>{
    const promise = clientEmployee.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteEmployee', payload: body })
        }
    );
};

export const selectEmployee = id => async (dispatch, getState) =>{
    dispatch({ type: 'Select', payload: id })
};
export const SelectAll = checkType => async (dispatch, getState) =>{
    dispatch({ type: 'SelectAll', payload: checkType })
}