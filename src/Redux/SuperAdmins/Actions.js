import getErrorMessage from "../../Errors";
import { logout } from "../Profile/ProfileActions";
import {
    FETCH_ADMINS_REQUEST,
    FETCH_ADD_ADMIN_SUCCESS,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_FAILURE,
    FETCH_DELETE_ADMIN_SUCCESS,
    FETCH_EDIT_ADMIN_SUCCESS,
    FETCH_INIT_EDIT_ADMIN,
    FETCH_GET_ADMINS_FAILURE
} from "./ActionTypes";

const adminsClient = require('./Client');

const adminsRequestAction = () => {
    return {
        type: FETCH_ADMINS_REQUEST,
    };
};


export async function initEditAdmin(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_ADMIN, payload: "" }) 
}

const adminsSuccessAction = (admins) => {
    return {
        type: FETCH_ADMINS_SUCCESS,
        payload: admins,
    };
};
const editAdminSuccessAction = (admin) => {
    return {
        type: FETCH_EDIT_ADMIN_SUCCESS,
        payload: admin,
    };
};
const deleteAdminSuccessAction = (id) => {
    return {
        type: FETCH_DELETE_ADMIN_SUCCESS,
        payload: id,
    };
};
const addAdminSuccessAction = (admins) => {
    return {
        type: FETCH_ADD_ADMIN_SUCCESS,
        payload: admins,
    };
};

const adminsFailureAction = (error) => {
    return {
        type: FETCH_ADMINS_FAILURE,
        payload: error,
    };
};
const getAdminsFailureAction = (error) => {
    return {
        type: FETCH_GET_ADMINS_FAILURE,
        payload: error,
    };
};
export const addSuperAdmin = body => async (dispatch, getState) => {
    dispatch(adminsRequestAction());

    const promise = adminsClient.post(body);

    promise.then((response) => {
        const admin = response.data.result;
        console.log("admin Show : \n", admin);
        dispatch(addAdminSuccessAction(admin));
    })
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(adminsFailureAction(errorMsg));
    });
};
export async function getSuperdmins(dispatch, getState) {
    dispatch(adminsRequestAction());

    const promise = adminsClient.get();

    promise.then((response) => {
        dispatch(adminsSuccessAction(response.data.result));
    })
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(getAdminsFailureAction(errorMsg));
    });
};


export const deleteSuperAdmin = body => async (dispatch, getState) =>{
    dispatch(adminsRequestAction());
    const promise = adminsClient.deleteItem(body);
    promise.then(
        res => {
            if(String(body)===getState().Admin.admin._id)
                dispatch(logout());
            else
                dispatch(deleteAdminSuccessAction(body));
        }
    )

    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(adminsFailureAction(errorMsg));
    });
};


export const editSuperAdmin = options => async (dispatch, getState) =>{
    dispatch(adminsRequestAction());
    const {id, body} = options;
    const promise = adminsClient.patch(body,id);
    promise.then(
        res => {
            dispatch(editAdminSuccessAction(res.data.result.admin))
        }
    )
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(adminsFailureAction(errorMsg));
    });
};