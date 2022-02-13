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
const initState = {
  loading: false,
  tenants: [],
  error: "",
};
const TenantsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_TENANTS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_ADD_TENANT_SUCCESS: {
      let list = state.tenants;
      list.push(action.payload);
      return {...state, loading:false,error:"", tenants:list};
    }
    case FETCH_DELETE_TENANT_SUCCESS: {
      return {...state, loading:false,error:"",
        tenants:state.tenants.filter(item => item._id !== action.payload)
      }
    }
    case FETCH_EDIT_TENANT_SUCCESS: {
      return {...state,
        loading:false,
        error:"edited",
        tenants:state.tenants.map(item => 
          item._id === action.payload._id ? action.payload: item
      )}
    }
    case FETCH_INIT_EDIT_TENANT:{
      return {...state, error:""}
    }
    case FETCH_TENANTS_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    }

    case FETCH_GET_TENANTS_FAILURE: {
      return {
        error: action.payload,
        loading: false,
        tenants: []
      };
    }
    case FETCH_TENANTS_SUCCESS: {
      return {
        tenants:action.payload,
        loading: false,
        error: "",
      };
    }
    default: {
      return state;
    }
  }
}
export default TenantsReducer;
