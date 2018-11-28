import { listConstants } from "../constants";

const initState = {
    lists: [],
    loading: false,
    error: null
};


export function userlist(state = initState, action) {
    switch (action.type) {
      case listConstants.CREATE_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.CREATE_SUCCESS:
        return { ...state, loading: false};
      case listConstants.CREATE_FAILURE:
        return { ...state, loading: false, error: action.payload.error }; 

      case listConstants.ADD_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.ADD_SUCCESS:
        return { ...state, loading: false, lists: action.payload };
      case listConstants.ADD_FAILURE:
        return { ...state, loading: false, error: action.payload.error }; 

      case listConstants.GET_LISTS_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.GET_LISTS_SUCCESS:
        return { ...state, loading: false, lists: action.payload };
      case listConstants.GET_LISTS_FAILURE:
        return { ...state, loading: false, error: action.payload.error, lists: [] };

      default:
        return state;
    }
}