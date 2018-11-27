import { listConstants } from "../constants";
import { listService } from "../services";
import { alertActions } from ".";
import { history } from "../helpers/history";

export const listActions = {
    createListRequest,
    createListSuccess,
    createListFailure,
    createList,
    addToList,
};



function createListRequest() {
  return { 
      type: listConstants.CREATE_REQUEST
};
}

function createListSuccess(payload) {
  return {
      type: listConstants.CREATE_SUCCESS, payload
    };
}

function createListFailure(message) {
  return {
      type: listConstants.CREATE_FAILURE, message
    };
}

function createList(title) {
    return dispatch => {
        dispatch(createListRequest());
        listService.createList(title)
            .then(
                list => {
                    dispatch(createListSuccess(list));
                    history.push('/');
                    dispatch(alertActions.success('New list was created'));
                    console.log('Created new list')
                },
                error => {
                    dispatch(createListFailure(error));
                    dispatch(alertActions.error(error));
                }
            );
    }
}
    
    function addToListRequest() {
        return {
            type: listConstants.ADD_REQUEST
        };
    }

    function addToListSuccess(message) {
        return {
            type: listConstants.ADD_SUCCESS, message
        };
    }

    function addToListFailure(message) {
        return {
            type: listConstants.ADD_FAILURE, message
        };
    }

function addToList(listItem, listId) {
        return dispatch => {
            dispatch(addToListRequest());
            listService.addToList(listItem, listId)
                .then(
                    listItem => {
                        dispatch(addToListSuccess(listItem));
                        history.push('/');
                        dispatch(alertActions.success('Item was added to list'));
                        console.log('Created new list item')
                    },
                    error => {
                        dispatch(addToListFailure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
    }

