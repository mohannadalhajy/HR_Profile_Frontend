import {
  FETCH_GET_ALL_RESPONSES_REQUEST,
  FETCH_GET_ALL_RESPONSES_SUCCESS,
  FETCH_GET_ALL_RESPONSES_FAILURE,
  FETCH_EDIT_RESPONSE,
  FETCH_EDIT_RESPONSE_FAILURE
} from './ResponsesActionTypes'
const initState = {
  loading: false, 
  responses: [],
  error: "",
};
  
const ResponseReducer = (state = initState, action) => {
    switch(action.type){
      case FETCH_GET_ALL_RESPONSES_REQUEST: {
        return {
            ...state,
            loading: true,
            error: "",
          };
        }
        case FETCH_GET_ALL_RESPONSES_SUCCESS: {
        return {
            loading: false,
            responses: action.payload,
            error: "",
          };
        }
        case FETCH_GET_ALL_RESPONSES_FAILURE: {
        return {
            responses: [],
            error: action.payload,
            loading:false
          };
        }

        case FETCH_EDIT_RESPONSE:{
          console.log("llll",action.payload)
          return {
            loading:false,
            error:"edited",
            responses:state.responses.map(
              item => item._id === action.payload._id ? action.payload: item
            )}
        }
        case FETCH_EDIT_RESPONSE_FAILURE:{
          return {
            ...state,
            error: action.payload,
            loading:false
          };
        }
      default: return state;
    }
}
export default ResponseReducer;
