import getErrorMessage from "../../Errors";
import {
    FETCH_TENANTS_REQUEST,
    FETCH_ADD_TENANT_SUCCESS,
    FETCH_TENANTS_SUCCESS,
    FETCH_TENANTS_FAILURE,
    FETCH_DELETE_TENANT_SUCCESS,
    FETCH_EDIT_TENANT_SUCCESS,
    FETCH_INIT_EDIT_TENANT,
    FETCH_GET_TENANTS_FAILURE
} from "./TenantsActionTypes";

const tenantsClient = require('./TenantsClient');

export const tenantsRequestAction = () => {
    return {
        type: FETCH_TENANTS_REQUEST,
    };
};


export async function initEditTenant(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_TENANT, payload: "" }) 
}

export const tenantsSuccessAction = (tenants) => {
    return {
        type: FETCH_TENANTS_SUCCESS,
        payload: tenants,
    };
};
export const editTenantSuccessAction = (tenant) => {
    return {
        type: FETCH_EDIT_TENANT_SUCCESS,
        payload: tenant,
    };
};
export const deleteTenantSuccessAction = (id) => {
    return {
        type: FETCH_DELETE_TENANT_SUCCESS,
        payload: id,
    };
};
export const addTenantSuccessAction = (tenants) => {
    return {
        type: FETCH_ADD_TENANT_SUCCESS,
        payload: tenants,
    };
};

export const tenantsFailureAction = (error) => {
    return {
        type: FETCH_TENANTS_FAILURE,
        payload: error,
    };
};
export const getTenantsFailureAction = (error) => {
    return {
        type: FETCH_GET_TENANTS_FAILURE,
        payload: error,
    };
};
export const addTenant = body => async (dispatch, getState) => {
    dispatch(tenantsRequestAction());

    const promise = tenantsClient.post(body);

    promise.then((response) => {
        const tenant = response.data.result;
        console.log("tenant Show : \n", tenant);
        dispatch(addTenantSuccessAction(tenant));
    })
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(tenantsFailureAction(errorMsg));
    });
};
export async function getTenants(dispatch, getState) {
    dispatch(tenantsRequestAction());

    const promise = tenantsClient.get();

    promise.then((response) => {
        dispatch(tenantsSuccessAction(response.data.result));
    })
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(getTenantsFailureAction(errorMsg));
    });
};


export const deleteTenant = body => async (dispatch, getState) =>{
    dispatch(tenantsRequestAction());
    const promise = tenantsClient.deleteItem(body);
    promise.then(
        res => {
            dispatch(deleteTenantSuccessAction(body));
        }
    )

    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(tenantsFailureAction(errorMsg));
    });
};


export const editTenant = options => async (dispatch, getState) =>{
    dispatch(tenantsRequestAction());
    const {id, body} = options;
    const promise = tenantsClient.patch(body,id);
    promise.then(
        res => {
            dispatch(editTenantSuccessAction(res.data.result))
        }
    )
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(tenantsFailureAction(errorMsg));
    });
};