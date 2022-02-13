import {
  FETCH_GET_ALL_EMPLOYEES_REQUEST,
  FETCH_GET_ALL_EMPLOYEES_SUCCESS,
  FETCH_GET_ALL_EMPLOYEES_FAILURE,
  FETCH_ADD_EMPLOYEE,
  FETCH_EDIT_EMPLOYEE,
  FETCH_ADD_EMPLOYEE_FAILURE,
  FETCH_INIT_EDIT_EMPLOYEE
} from './EmployeesActionTypes'
const initState = {
  loading: false, 
  employees: [],
  pageCount:1,
  count:0,
  selectedCount:0,
  error: ""
};

const EmployeeReducer = (state = initState, action) => {
    switch(action.type){
      case FETCH_GET_ALL_EMPLOYEES_REQUEST: {
        return {
            ...state,
            loading: true,
            error: "",
          };
        }
        case FETCH_GET_ALL_EMPLOYEES_SUCCESS: {
        return {
            loading: false,
            employees: action.payload.employees,
            pageCount:action.payload.pageCount,
            count:action.payload.count,
            selectedCount:0,
            error: "",
          };
        }
        case FETCH_GET_ALL_EMPLOYEES_FAILURE: {
        return {
            employees: [],
            error: action.payload,
            loading:false
          };
        }
        /*case 'getAllEmployees': {
          return action.payload
        }*/
        case FETCH_ADD_EMPLOYEE:{
          let list = state.employees;
          list.push({...action.payload,checked:false});
          return {...state, loading:false,error:"", employees:list};
        }

        case FETCH_EDIT_EMPLOYEE:{
          return {...state, loading:false,error:"edited", employees:state.employees.map(item => item._id === action.payload._id ? action.payload: item
            )}
        }
        case FETCH_INIT_EDIT_EMPLOYEE:{
          return {...state, error:""}
        }
        case FETCH_ADD_EMPLOYEE_FAILURE:{
          return {
            ...state,
            error: action.payload,
            loading:false
          };
        }
        case 'Select':{
          const list = state.employees.map(item =>
            item._id === action.payload
              ? { ...item, checked: !item.checked }
              : item
          );
          const count =  list.filter(item=>item.checked).length
          return {...state,employees:list, selectedCount:count};
        }
        case 'SelectAll':{
          const list = state.employees.map(item => {return { ...item, checked: action.payload }});
          return {...state,employees:list, selectedCount:list.filter(item=>item.checked).length};
        }
        case 'DeselectAll':{
          const list = state.employees.map(item => {return { ...item, checked: false }});
          return {...state,employees:list,selectedCount:0};
        }
        case 'DeleteEmployee':{
          return {...state, 
            pageCount:action.payload==="all"?1:state.pageCount,
            employees:action.payload==="all"?[]:
              state.employees.filter(item => item._id !== action.payload),
            selectedCount:action.payload==="all"?0:state.selectedCount-1
            }
        }
      default: return state;
    }
}
export default EmployeeReducer;
