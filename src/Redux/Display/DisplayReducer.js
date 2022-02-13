import {
  FETCH_GET_ALL_DISPLAYS_REQUEST,
  FETCH_GET_ALL_DISPLAYS_SUCCESS,
  FETCH_GET_ALL_DISPLAYS_FAILURE,
  FETCH_EDIT_DISPLAYS,
  FETCH_EDIT_DISPLAYS_FAILURE,
  FETCH_EDIT_DISPLAY
} from './DisplayActionTypes'
const initState = {
  loading: false, 
  displays: [],
  error: "",
};
  
const DisplayReducer = (state = initState, action) => {
    switch(action.type){
      case FETCH_GET_ALL_DISPLAYS_REQUEST: {
        return {
            ...state,
            loading: true,
            error: "",
          };
        }
        case FETCH_GET_ALL_DISPLAYS_SUCCESS: {
        return {
            loading: false,
            displays: action.payload,
            error: "",
          };
        }
        case FETCH_GET_ALL_DISPLAYS_FAILURE: {
        return {
            displays: [],
            error: action.payload,
            loading:false
          };
        }

        case FETCH_EDIT_DISPLAYS:{
          return {
            loading:false,
            error:"edited",
            displays:state.displays.map(
              item => item._id === action.payload._id ? action.payload: item
            )}
        }
        case FETCH_EDIT_DISPLAY:{
          return {
            displays:state.displays.map(
              item => item._id === action.payload ? {...item,display:!item.display}: item
            )}
        }
        case FETCH_EDIT_DISPLAYS_FAILURE:{
          return {
            ...state,
            error: action.payload,
            loading:false
          };
        }
      default: return state;
    }
}
export default DisplayReducer;
