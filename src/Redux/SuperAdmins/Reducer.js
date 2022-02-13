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
const initState = {
  loading: false,
  admins: [],
  error: "",
};
const AdminsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ADMINS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_ADD_ADMIN_SUCCESS: {
      let list = state.admins;
      list.push(action.payload);
      return {...state, loading:false,error:"", admins:list};
    }
    case FETCH_DELETE_ADMIN_SUCCESS: {
      return {...state, loading:false,error:"",
        admins:state.admins.filter(item => item._id !== action.payload)
      }
    }
    case FETCH_EDIT_ADMIN_SUCCESS: {
      return {...state,
        loading:false,
        error:"edited",
        admins:state.admins.map(item => 
          item._id === action.payload._id ? action.payload: item
      )}
    }
    case FETCH_INIT_EDIT_ADMIN:{
      return {...state, error:""}
    }
    case FETCH_ADMINS_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }

    case FETCH_GET_ADMINS_FAILURE: {
      return {
        error: action.payload,
        loading: false,
        admins: []
      };
    }
    case FETCH_ADMINS_SUCCESS: {
      return {
        admins:action.payload,
        loading: false,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
}
export default AdminsReducer;
