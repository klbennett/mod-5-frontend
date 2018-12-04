import { hansardConstants } from "../constants";
import { alertActions } from ".";
import { keys } from "../env.js"


export const hansardActions = {
    fetchHansardBegin,
    fetchHansardSuccess,
    fetchHansardError,
    fetchHansard,
    saveSearchTerm,
};

function fetchHansardBegin() {
    return { type: hansardConstants.BEGIN };
}

function fetchHansardSuccess(payload) {
    return { type: hansardConstants.SUCCESS, payload }
};

function saveSearchTerm(payload) {
    return { type: hansardConstants.SEARCH_TERM, payload };
};

function saveSearchType(payload) {
    return { type: hansardConstants.SEARCH_TYPE, payload };
};

function fetchHansardError(error) {
   return {
       type: hansardConstants.FAILURE,
       payload: { error }
    }
};

function fetchHansard(searchTerm, type) {
    return dispatch => {
        dispatch(fetchHansardBegin());
        dispatch(saveSearchTerm(searchTerm));
        dispatch(saveSearchType(type));
        return fetch(`https://www.theyworkforyou.com/api/getDebates?search=${searchTerm}&type=${type}&key=${keys.TWFY_KEY}&num=10`)
          .then(handleErrors)
          .then(res => res.json())
          .then(json => {
            dispatch(fetchHansardSuccess(json.rows));
            localStorage.setItem("results", JSON.stringify(json));
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