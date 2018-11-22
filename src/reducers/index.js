import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {
    FETCH_HANSARD,
} from '../actions/types'


const hansardReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_HANSARD:
            console.log("inside reducer")
            return action.payload
        default:
            return state
    }
}

const rootReducer = combineReducers({
    hansard: hansardReducer,
})

// NOTE:
// the keys in the object passed to combineReducers
// will become the top level keys of redux store state
// i.e. store.getState() would return =>
// {
//   hansard: {
//     /* state returned ftom hansardReducer */
//   }
// }

export default rootReducer;