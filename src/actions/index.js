import {
    FETCH_HANSARD,
} from './types'



export function fetchHansard(dispatch, result) {
    dispatch({
        type: 'FETCH_HANSARD',
       payload: result })
 
    };
