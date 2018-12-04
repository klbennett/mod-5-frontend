import { listConstants } from "../constants";

const initState = {
    lists: [],
    loading: false,
    error: null
};


export function userlist(state = initState, action) {
    switch (action.type) {
//create a list
      case listConstants.CREATE_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.CREATE_SUCCESS:
        return { ...state, loading: false, lists: [...state.lists, action.payload] };
      case listConstants.CREATE_FAILURE:
        return { ...state, loading: false, error: action.payload.error }; 
// add to list
      case listConstants.ADD_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.ADD_SUCCESS:
        return { ...state, loading: false }
          // , lists: [...state.lists].map(list => list.id === action.payload.id ? { ...list, action.payload}: list }}
      case listConstants.ADD_FAILURE:
        return { ...state, loading: false, error: action.payload.error }; 

      case listConstants.GET_LISTS_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.GET_LISTS_SUCCESS:
        return { ...state, loading: false, lists: action.payload };
      case listConstants.GET_LISTS_FAILURE:
        return { ...state, loading: false, error: action.error, lists: [] };

      case listConstants.DELETE_LIST_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.DELETE_LIST_SUCCESS:
        return { ...state, loading: false, lists: state.lists.filter(list => list.id !== action.payload)};
      case listConstants.DELETE_LIST_FAILURE:
        return { ...state, loading: false, error: action.error };

      case listConstants.DELETE_LIST_ITEM_REQUEST:
        return { ...state, loading: true, error: null };
      case listConstants.DELETE_LIST_ITEM_SUCCESS:
        return {...state, loading: false, lists: Object.assign({}, action.payload) }
      case listConstants.DELETE_LIST_ITEM_FAILURE:
        return { ...state, loading: false, error: action.error };

      default:
        return state;
    }
}