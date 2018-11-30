import { contactInfoConstants } from "../constants";

const initState = {
    selectedPolitician: [],
    loading: false,
    error: null
};


export function getContactInfo(state = initState, action) {
    switch (action.type) {
        case contactInfoConstants.BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case contactInfoConstants.SUCCESS:
            return {
                ...state,
                loading: false,
                selectedPolitician: action.payload
            };
        case contactInfoConstants.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state
    }
}