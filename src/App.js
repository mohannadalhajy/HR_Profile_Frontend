import './App.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component'
import { PROFILE_ROUTE, RESET_EMAIL_ROUTE, RESET_PASSWORD_ROUTE, LOGIN_ROUTE, ADD_SUPER_ADMIN_ROUTE, SUPER_ADMINS_ROUTE, EDIT_SUPER_ADMIN_ROUTE, PREFIX, TENANTS_ROUTE, ADD_TENANT_ROUTE, EDIT_TENANT_ROUTE, ADMINS_ROUTE, DETAILS_TENANT_ROUTE, ADD_ADMIN_ROUTE, EDIT_ADMIN_ROUTE, EMPLOYEES_ROUTE, SEARCH_ROUTE, ADD_EMPLOYEE_ROUTE, EDIT_EMPLOYEES_ROUTE, EMPLOYEES_Details_ROUTE, LANDING_BAGE_ROUTE, LANDING_ROUTE, LANDING_EMPLOYEE_ROUTE } from './constants/index';
import Sidebar from "react-sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { profileMe } from './Redux/Profile/ProfileActions';
import { getSuperdmins } from './Redux/SuperAdmins/Actions';
import { getTenants } from './Redux/Tenants/TenantsActions';
const Employees = loadable(() => import('./components/Employees/Employees'));
const AddEmployee = loadable(() => import('./components/Employees/AddEmployee'));
const EditEmployee = loadable(() => import('./components/Employees/EditEmployee'));
const EmployeeDetails = loadable(() => import('./components/Employees/EmployeeDetails'));
const EmployeesSearch = loadable(() => import('./components/Employees/EmployeesSearch'));
const NavMenu = loadable(() => import('./components/NavMenu'));
const Login = loadable(() => import('./components/Profile/Login'));
const SideBarContent = loadable(() => import('./components/Sidebar/SideBar'));
const Profile = loadable(() => import('./components/Profile/Profile'));
const ResetEmail = loadable(() => import('./components/Profile/ResetEmail'));
const ResetPass = loadable(() => import('./components/Profile/ResetPass'));
const AddSuperAdmin = loadable(() => import('./components/SuperAdmins/AddSuperAdmin'));
const SuperAdmins = loadable(() => import('./components/SuperAdmins/SuperAdmins'));
const EditSuperAdmin = loadable(() => import('./components/SuperAdmins/EditSuperAdmin'));
const Tenants = loadable(() => import('./components/Tenants/Tenants'));
const AddTenant = loadable(() => import('./components/Tenants/AddTenant'));
const EditTenant = loadable(() => import('./components/Tenants/EditTenant'));
const Admins = loadable(() => import('./components/Admins/Admins'));
const AddAdmin = loadable(() => import('./components/Admins/AddAdmin'));
const EditAdmin = loadable(() => import('./components/Admins/EditAdmin'));
const DetailsTenant = loadable(() => import('./components/Tenants/DetailsTenant'));
const PageContent = loadable(() => import('./components/Landing/PageContent'));
const Page = loadable(() => import('./components/Landing/Page'));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">loading</div>
  </div>
);
function App() {
  const dispatch = useDispatch();
  const mql = window.matchMedia(`(min-width: 800px)`);
  const admin = useSelector(state => state.Admin);
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          dispatch(profileMe);
          dispatch(getSuperdmins)
          dispatch(getTenants);
          console.log("done")
        } catch (error) {
          console.log("failed")
        }
      }
    })();
  }, [dispatch]);
  const handle = () => {
    setCollapsed(!collapsed)
  }
  const superAdmin = "superAdmin"
  return (
    <div>
      <Router>
        <React.Suspense fallback={loading}>
          {admin.admin.email === undefined ? <React.Fragment /> :
            <NavMenu setCollapsed={setCollapsed} collapsed={collapsed} />}
          <Sidebar
            sidebar={<SideBarContent />}
            open={collapsed && admin.admin.email !== undefined}
            docked={collapsed && mql.matches && admin.admin.email !== undefined}
            onSetOpen={handle}
            styles={{ sidebar: { background: "white" }, root: { top: admin.admin.email === undefined ? 0 : 60 } }}>
            <Switch>
              {admin.admin.role === superAdmin ?
                <Route path={PREFIX} exact component={Tenants}></Route>
                :
                <Route path={PREFIX} exact component={Employees}></Route>
              }
              <Route path={TENANTS_ROUTE} exact component={Tenants}></Route>
              <Route path={ADD_TENANT_ROUTE} exact component={AddTenant}></Route>
              <Route path={EDIT_TENANT_ROUTE} exact component={EditTenant}></Route>
              <Route path={DETAILS_TENANT_ROUTE} exact component={DetailsTenant}></Route>
              <Route path={ADD_SUPER_ADMIN_ROUTE} exact><AddSuperAdmin /></Route>
              <Route path={SUPER_ADMINS_ROUTE} exact><SuperAdmins /></Route>
              <Route path={LOGIN_ROUTE}><Login /></Route>
              <Route path={EDIT_SUPER_ADMIN_ROUTE} component={EditSuperAdmin}></Route>
              <Route path={PROFILE_ROUTE} component={Profile}></Route>
              <Route path={RESET_EMAIL_ROUTE} component={ResetEmail}></Route>
              <Route path={RESET_PASSWORD_ROUTE} component={ResetPass}></Route>
              <Route path={ADMINS_ROUTE} component={Admins}></Route>
              <Route path={ADD_ADMIN_ROUTE} component={AddAdmin}></Route>
              <Route path={EDIT_ADMIN_ROUTE} component={EditAdmin}></Route>
              <Route path={EMPLOYEES_ROUTE}><Employees /></Route>
              <Route path={SEARCH_ROUTE}><EmployeesSearch /></Route>
              <Route path={ADD_EMPLOYEE_ROUTE}><AddEmployee /></Route>
              <Route path={EDIT_EMPLOYEES_ROUTE} component={EditEmployee}></Route>
              <Route path={EMPLOYEES_Details_ROUTE} component={EmployeeDetails}></Route>
              <Route path={LANDING_BAGE_ROUTE} component={PageContent} exact></Route>
              <Route path={LANDING_ROUTE} exact component={Page}></Route>
              <Route path={LANDING_EMPLOYEE_ROUTE} component={Page}></Route>
            </Switch>
          </Sidebar>
        </React.Suspense>
      </Router>
    </div>
  );
}
export default App;