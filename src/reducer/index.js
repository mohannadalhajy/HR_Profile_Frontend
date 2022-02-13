import {combineReducers} from 'redux';
import ProfileReducer from '../Redux/Profile/ProfileReducer';
import SuperAdminsReducer from '../Redux/SuperAdmins/Reducer';
import TenantsReducer from '../Redux/Tenants/TenantsReducer';
import AdminsReducer from '../Redux/Admins/Reducer';
import EmployeeReducer from '../Redux/Employees/EmployeeReducer';
import DisplayReducer from '../Redux/Display/DisplayReducer';
import ResponseReducer from '../Redux/Responses/ResponseReducer';

const allReducers = combineReducers({
    Employees : EmployeeReducer,
    Admin : ProfileReducer,
    SuperAdmins : SuperAdminsReducer,
    Admins : AdminsReducer,
    Tenants : TenantsReducer,
    Responses : ResponseReducer,
    Displays : DisplayReducer,
});
export default allReducers;
 