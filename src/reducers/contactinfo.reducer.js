import { hansardConstants } from "../constants";

const initState = {
    selectedPolitician: [],
    loading: false,
    error: null
};


export function getContactInfo(state = initState, action) {
    switch (action.type) {
        case hansardConstants.BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case hansardConstants.SUCCESS:
            return {
                ...state,
                loading: false,
                results: action.payload
            };
        case hansardConstants.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case hansardConstants.SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload
            }
        default:
            return state
    }
}