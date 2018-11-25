import { hansardConstants } from "../constants";

const API_ENDPOINT = './response.js'
const MY_API_KEY = "c39a26d9c12f48dba2a5c00e35684ecc";
const EXAMPLE_REQ = "https://www.theyworkforyou.com/api/getHansard?search=climate&key=AoGBodDXTcTtBNwGn8AytXeB";


export const hansardActions = {
    fetchHansardBegin,
    fetchHansardSuccess,
    fetchHansardError,
    fetchHansard
};

function fetchHansardBegin() {
    return { type: hansardConstants.SUCCESS };
}

function fetchHansardSuccess(json) {
    return { type: hansardConstants.FETCH_HANSARD_SUCCESS, json }
};

function fetchHansardError(error) {
   return { type: hansardConstants.FETCH_HANSARD_ERROR,
    payload: { error }}
};

function fetchHansard(searchTerm) {
    return dispatch => {
        dispatch(fetchHansardBegin());
        return fetch(EXAMPLE_REQ)
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchHansardSuccess(json.results));
            return json.results;
          })
          .catch(error => dispatch(fetchHansardError(error)));
    };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}