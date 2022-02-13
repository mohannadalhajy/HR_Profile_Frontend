import React, { useEffect, useState } from "react";
//import { getPayloadLogin, getPayloadSignup } from '../../actions/LoginActions';
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN_ROUTE } from "../../constants";
import Users from "../Admins/Admins";
const TenantsClient = require('../../Redux/Tenants/TenantsClient')
function EditTenant() {
    let history = useHistory();
    const location = useLocation();
    const admin_store = useSelector(state => state.Admin)
    const [tenant, setTenant] = useState();
    useEffect(() => {
        var str = location.search;
        var id = str.substring(1);
        const promise = TenantsClient.getById(id);
        promise.then(res => {
            setTenant(res.data.result)
        }).catch(
            err => {
                console.log("error in edit admin", err)
            }
        );
    }, [location]);

    return (
        <div>
            {!admin_store.admin.email && !admin_store.loading ? history.push(LOGIN_ROUTE) :
                <div>
                    {tenant ?
                        <React.Fragment>
                            <div>
                                Tenant name: {tenant.name}
                            </div>
                            <Users tenantId={tenant._id} />
                        </React.Fragment>
                        : <React.Fragment />}
                </div>
            }
        </div>
    );
}
export default EditTenant;