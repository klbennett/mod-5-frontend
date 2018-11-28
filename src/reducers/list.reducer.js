import { listConstants } from "../constants";

const initState = {
    list: [],
    loading: false,
    error: null
};


export function list(state = initState, action) {
    switch (action.type) {
      case listConstants.CREATE_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.CREATE_SUCCESS:
        return { ...state, loading: false, list: action.payload };
      case listConstants.CREATE_FAILURE:
        return { ...state, loading: false, error: action.payload.error, list: [] }; // change if I do not want to reset results

      case listConstants.ADD_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.ADD_SUCCESS:
        return { ...state, loading: false, list: action.payload };
      case listConstants.ADD_FAILURE:
        return { ...state, loading: false, error: action.payload.error, list: [] }; // change if I do not want to reset results
    
      
        default:
        return state;
    }
}