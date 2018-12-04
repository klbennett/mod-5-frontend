import { hansardConstants } from "../constants";

const initState = {
    items: [],
    loading: false,
    error: null
};


    export function hansard(state = initState, action) {
        switch (action.type) {
          case hansardConstants.BEGIN:
            return { ...state, loading: true, error: null };
          case hansardConstants.SUCCESS:
            return { ...state, loading: false, results: action.payload };
          case hansardConstants.FAILURE:
            return { ...state, loading: false, error: action.payload.error };
          case hansardConstants.SEARCH_TERM:
            return { ...state, searchTerm: action.payload };
          case hansardConstants.SEARCH_TYPE:
            return { ...state, type: action.payload };
          default:
            return state;
        }
    }