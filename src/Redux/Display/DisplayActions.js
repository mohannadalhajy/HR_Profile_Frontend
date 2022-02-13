import {
    FETCH_GET_ALL_DISPLAYS_REQUEST,
    FETCH_GET_ALL_DISPLAYS_SUCCESS,
    FETCH_GET_ALL_DISPLAYS_FAILURE,
    FETCH_EDIT_DISPLAYS,
    FETCH_EDIT_DISPLAY,
    FETCH_EDIT_DISPLAYS_FAILURE
} from './DisplayActionTypes'
const clientDisplay = require ('./clientDisplay');

export const getDisplaysRequestAction = () => {
    return {
      type: FETCH_GET_ALL_DISPLAYS_REQUEST,
    };
};

export const getDisplaysSuccessAction = (user) => {
return {
    type: FETCH_GET_ALL_DISPLAYS_SUCCESS,
    payload: user,
};
};


const getDisplaysFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_DISPLAYS_FAILURE,
        payload: error,
    };
};
const editDisplaysFailureAction = (error) => {
    return {
        type: FETCH_EDIT_DISPLAYS_FAILURE,
        payload: error
    };
};

export async function getDisplays(dispatch, getState){
    dispatch(getDisplaysRequestAction());

    const promise = clientDisplay.get();

    promise.then((response) => {
        const list = response.data.result;
        dispatch(getDisplaysSuccessAction(list));
    }).catch((error) => {
        //const errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Responses"//getErrorMessage(error.response.data.error.code);
        dispatch(getDisplaysFailureAction("error"));
    });
};

export const editDisplays = displays => async (dispatch, getState) =>{
    dispatch(getDisplaysRequestAction());
    const promise = clientDisplay.patch({displays});
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_DISPLAYS, payload: res.data.result })
        }
    ).catch(err=>{
        //const errorMsg = getErrorMessage(err.response.data.error.message.code);
        dispatch(editDisplaysFailureAction("error"));
    });
};
export const editDisplay = id => async (dispatch, getState) =>{
    dispatch({ type: FETCH_EDIT_DISPLAY, payload: id })
};