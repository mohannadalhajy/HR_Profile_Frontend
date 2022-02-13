
import getErrorMessage from "../../Errors";
//import { logout } from "../Profile/ProfileActions";
import {
    FETCH_ADMINS_REQUEST,
    FETCH_ADD_ADMIN_SUCCESS,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_FAILURE,
    FETCH_DELETE_ADMIN_SUCCESS,
    FETCH_EDIT_ADMIN_SUCCESS,
    FETCH_INIT_EDIT_ADMIN,
    //FETCH_GET_ADMINS_FAILURE
} from "./ActionTypes";

const client = require('./Client');

const usersRequestAction = () => {
    return {
        type: FETCH_ADMINS_REQUEST,
    };
};


export async function initEditAdmin(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_ADMIN, payload: "" })
}

const usersSuccessAction = (users) => {
    return {
        type: FETCH_ADMINS_SUCCESS,
        payload: users,
    };
};
const editUserSuccessAction = (user) => {
    return {
        type: FETCH_EDIT_ADMIN_SUCCESS,
        payload: user,
    };
};
const deleteUserSuccessAction = (id) => {
    return {
        type: FETCH_DELETE_ADMIN_SUCCESS,
        payload: id,
    };
};
const addUserSuccessAction = (users) => {
    return {
        type: FETCH_ADD_ADMIN_SUCCESS,
        payload: users,
    };
};
const usersFailureAction = (error) => {
    return {
        type: FETCH_ADMINS_FAILURE,
        payload: error,
    };
};
export const addAdmin = (body, tenant) => async (dispatch, getState) => {
    dispatch(usersRequestAction());

    const promise = client.post(body, tenant._id);

    promise.then((response) => {
        const user = response.data.result;
        console.log("user Show : \n", user);
        dispatch(addUserSuccessAction(user));
    })
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(usersFailureAction(errorMsg));
    });
};
export const getAdminsByTenant = body => async (dispatch, getState) => {
    dispatch(usersRequestAction());
    const promise = client.getByTenant(body)
    promise.then(
        res => {
            dispatch(usersSuccessAction(res.data.result));
        }
    )

    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(usersFailureAction(errorMsg));
    });
};
export const deleteAdmin = (tenantId, body) => async (dispatch, getState) => {
    dispatch(usersRequestAction());
    const promise = client.deleteItem(tenantId, body);
    promise.then(
        res => {
            dispatch(deleteUserSuccessAction(body));
        }
    )

    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(usersFailureAction(errorMsg));
    });
};
export const editAdmin = options => async (dispatch, getState) => {
    dispatch(usersRequestAction());
    const { id, tenantId, body } = options;
    const promise = client.patch(body, tenantId, id);
    promise.then(
        res => {
            dispatch(editUserSuccessAction(res.data.result))
        }
    )
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(usersFailureAction(errorMsg));
    });
};

/*const getUsersFailureAction = (error) => {
    return {
        type: FETCH_GET_ADMINS_FAILURE,
        payload: error,
    };
};*/

/*export async function getUsers(dispatch, getState) {
    dispatch(usersRequestAction());

    const promise = client.get();

    promise.then((response) => {
        dispatch(usersSuccessAction(response.data.result));
    })
    promise.catch((error) => {
        let errorMsg = ""
        if (error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(getUsersFailureAction(errorMsg));
    });
};*/