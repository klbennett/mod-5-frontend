import { authHeader } from "../helpers";

export const listService = { createList, getList, addToList, getUsersLists };

const backendURL = 'http://localhost:3001/api/v1';

function createList(title) {
    const requestOptions = {
        method: "POST",
        headers: {
            ...authHeader(), "Content-Type": "application/json", "mode": "no-cors" 
        },
        body: JSON.stringify({ title })
    };

    return fetch(backendURL + '/createlist', requestOptions).then(handleResponse);
        };

function getList(id) {
    const requestOptions = {
        method: "GET",
        headers: {
            ...authHeader(), "Content-Type": "application/json", "mode": "no-cors"
        },
    };

    return fetch(backendURL + `/list/${id}`, requestOptions).then(handleResponse);
};

function getUsersLists(userid) {
    debugger
    const requestOptions = {
        method: "GET",
        headers: {
            ...authHeader(), "Content-Type": "application/json", "mode": "no-cors"
        },
    };

    return fetch(backendURL + `/userlists`, requestOptions).then(handleResponse);
};


function addToList(listItem, listId) {
    // debugger
    const requestOptions = {
        method: "POST",
        headers: {
            ...authHeader(), "Content-Type": "application/json", "mode": "no-cors"
        },
        body: JSON.stringify({
            ...listItem,
            list_id: listId
        })
    };
    return fetch(backendURL + `/createlistitem`, requestOptions).then(handleResponse);
};


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
