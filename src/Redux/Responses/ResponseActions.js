import {
    FETCH_GET_ALL_RESPONSES_REQUEST,
    FETCH_GET_ALL_RESPONSES_SUCCESS,
    FETCH_GET_ALL_RESPONSES_FAILURE,
    FETCH_EDIT_RESPONSE_FAILURE,
    FETCH_EDIT_RESPONSE
} from './ResponsesActionTypes'
import getErrorMessage from "../../Errors";
const clientResponse = require ('./clientResponse');

export const getResponsesRequestAction = () => {
    return {
      type: FETCH_GET_ALL_RESPONSES_REQUEST,
    };
};

export const getResponsesSuccessAction = (user) => {
return {
    type: FETCH_GET_ALL_RESPONSES_SUCCESS,
    payload: user,
};
};


export const getResponsesFailureAction = (error) => {
    return {
        type: FETCH_GET_ALL_RESPONSES_FAILURE,
        payload: error,
    };
};
export const editResponseFailureAction = (error) => {
    return {
        type: FETCH_EDIT_RESPONSE_FAILURE,
        payload: error
    };
};

export async function getResponses(dispatch, getState){
    dispatch(getResponsesRequestAction());

    const promise = clientResponse.get();

    promise.then((response) => {
        const list = response.data.result;
        dispatch(getResponsesSuccessAction(list));
    })
    promise.catch((error) => {
        const errorMsg = getErrorMessage(error.response.data.error.code);
        //const errorMsg = "error in Responses"//getErrorMessage(error.response.data.error.code);
        dispatch(getResponsesFailureAction(errorMsg));
    });
};

export const editResponses = options => async (dispatch, getState) =>{
    dispatch(getResponsesRequestAction());
    const {id, body} = options;
    const promise = clientResponse.patch(body,id);
    promise.then(
        res => {
            dispatch({ type: FETCH_EDIT_RESPONSE, payload: res.data.result })
        }
    ).catch(err=>{
        const errorMsg = getErrorMessage(err.response.data.error.message.code);
        dispatch(editResponseFailureAction(errorMsg));
    });
};

export const deleteResponse = body => async (dispatch, getState) =>{
    const promise = clientResponse.deleteItem(body);
    promise.then(
        res => {
            dispatch({ type: 'DeleteResponse', payload: res.data })
        }
    );
};
