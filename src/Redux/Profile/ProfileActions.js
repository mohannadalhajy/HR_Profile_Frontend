import getErrorMessage from "../../Errors";
import {
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILURE,
    FETCH_PROFILE_REQUEST,
    FETCH_EDIT_EMAIL_SUCCESS,
    FETCH_PROFILE_FAILURE,
    FETCH_RESET_PASS_SUCCESS,
    FETCH_INIT_EDIT_PROFILE
} from "./ProfileActionTypes";
import { getSuperdmins } from "../SuperAdmins/Actions";

const clientAuth = require('../../API/clientAuth');

export const loginRequestAction = () => {
    return {
        type: FETCH_LOGIN_REQUEST,
    };
};

export const loginSuccessAction = (admin) => {
    return {
        type: FETCH_LOGIN_SUCCESS,
        payload: admin,
    };
};

export const loginFailureAction = (error) => {
    return {
        type: FETCH_LOGIN_FAILURE,
        payload: error,
    };
};

export const login = body => async (dispatch, getState) => {
    dispatch(loginRequestAction());

    const promise = clientAuth.login(body);

    promise.then((response) => {
        const admin = response.data.result.admin;
        localStorage.setItem("accessToken", response.data.result.accessToken);
        localStorage.setItem("tenantId", response.data.result.admin.tenantId);
        console.log("AdminOShow : \n", admin);
        dispatch(loginSuccessAction(admin));
    })
    promise.catch((error) => {
        let errorMsg = ""
        if(error.response)
            errorMsg = getErrorMessage(error.response.data.error.message.code);
        else errorMsg = "Network Failed"
        dispatch(loginFailureAction(errorMsg));
    });
};



export async function profileMe(dispatch, getState) {
    dispatch(loginRequestAction());

    const promise = clientAuth.getProfile();

    promise.then((response) => {
        const admin = response.data.result.admin;
        dispatch(loginSuccessAction(admin));
    })
    promise.catch((error) => {
        localStorage.removeItem("accessToken");
        //const errorMsg = getErrorMessage(error.response.data.error.code);
        //dispatch(loginFailureAction(errorMsg));
    });
};
export const logout = () => {
    return (dispatch) => {
        dispatch(loginRequestAction());
        const promise = clientAuth.logout();
        promise.then((response) => {
            localStorage.removeItem("accessToken");
            dispatch(profileMe)
            dispatch(loginSuccessAction({}));
            dispatch(getSuperdmins);

        })
        promise.catch((error) => {
            let errorMsg = ""
            if(error.response)
                errorMsg = getErrorMessage(error.response.data.error.code);
            else errorMsg = "Network Failed"
            dispatch(loginFailureAction(errorMsg));
        });
    };
};
export const editEmailRequestAction = () => {
    return {
        type: FETCH_PROFILE_REQUEST,
    };
};
export const editAdminSuccessAction = (admin) => {
    return {
        type: FETCH_EDIT_EMAIL_SUCCESS,
        payload: admin,
    };
};
export const verifyCodeAdminFailureAction = (error) => {
    return {
        type: FETCH_PROFILE_FAILURE,
        payload: error,
    };
};

export const editEmail = (body) => {
    return (dispatch) => {
        dispatch(editEmailRequestAction());
        const promise = clientAuth.editEmail(body);
        promise.then((response) => {
            dispatch(editAdminSuccessAction(body.newEmail));
        })
        promise.catch((error) => {
            let errorMsg = ""
            if(error.response)
                errorMsg = getErrorMessage(error.response.data.error.message.code);
            else errorMsg = "Network Failed"
            dispatch(verifyCodeAdminFailureAction(errorMsg));
        });
    };
};

export const resetPasswordSuccessAction = () => {
    return {
        type: FETCH_RESET_PASS_SUCCESS,
        payload: "",
    };
};
export const resetPass = (body) => {
    return (dispatch) => {
        dispatch(editEmailRequestAction());
        const promise = clientAuth.resetPass(body);
        promise.then((response) => {
            dispatch(resetPasswordSuccessAction());
        })
        promise.catch((error) => {
            let errorMsg = ""
            if(error.response)
                errorMsg = getErrorMessage(error.response.data.error.message.code);
            else errorMsg = "Network Failed"
            dispatch(verifyCodeAdminFailureAction(errorMsg));
        });
    };
};

export async function initEditProfile(dispatch, getState) {
    dispatch({ type: FETCH_INIT_EDIT_PROFILE, payload: "" }) 
}




