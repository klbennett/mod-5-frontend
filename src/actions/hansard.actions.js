import { hansardConstants } from "../constants";

const API_ENDPOINT = './response.js'
const MY_API_KEY = "c39a26d9c12f48dba2a5c00e35684ecc";
const EXAMPLE_REQ = "https://www.theyworkforyou.com/api/getHansard?search=climate&key=AoGBodDXTcTtBNwGn8AytXeB";


export const hansardActions = {
    fetchHansardBegin,
    fetchHansardSuccess,
    fetchHansardError,
    fetchHansard,
    saveSearchTerm,
};

function fetchHansardBegin() {
    return {
        type: hansardConstants.BEGIN
    };
}

function fetchHansardSuccess(payload) {
    return {
        type: hansardConstants.SUCCESS, payload
    }
};

function saveSearchTerm(payload) {
    return {
        type: hansardConstants.SEARCH_TERM, payload
    };
};

function fetchHansardError(error) {
   return {
       type: hansardConstants.FAILURE,
       payload: { error }
    }
};

function fetchHansard(searchTerm) {
    return dispatch => {
        dispatch(fetchHansardBegin());
        dispatch(saveSearchTerm(searchTerm));
        return fetch(`https://www.theyworkforyou.com/api/getHansard?search=${searchTerm}&key=AoGBodDXTcTtBNwGn8AytXeB&num=100`)
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchHansardSuccess(json.rows));
            return json.rows;
          })
          .catch(error => dispatch(fetchHansardError(error)));
    };
}

// Promise will resolve if an error is returned. This handles HTTP errors
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}