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
    getUsersLists,
    deleteList,
    deleteListItem
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
        // debugger
        listService.createList(title)
            .then(
                list => {
                    dispatch(createListSuccess(list));
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
    // debugger
        return dispatch => {
            // dispatch(addToListRequest());
            listService.addToList(listItem, listId)
                .then(
                    listItem => {
                        // dispatch(addToListSuccess(listItem));
                        history.push('/');
                        dispatch(alertActions.success('Item was added to list'));
                        console.log('Created new list item')
                    },
                    error => {
                        // dispatch(addToListFailure(error));
                        dispatch(alertActions.error(error));
                    }
                );
        }
    }

function getUserListRequest() {
  return { type: listConstants.GET_LISTS_REQUEST };
}

function getUserListSuccess(payload) {
  return { type: listConstants.GET_LISTS_SUCCESS, payload };
}

function getUserListFailure(message) {
  return { type: listConstants.GET_LISTS_FAILURE, message };
}

function getUsersLists() {
    return dispatch => {
        dispatch(getUserListRequest())
        listService.getUsersLists()
        .then(
            userLists => {
            dispatch(getUserListSuccess(userLists))
            dispatch(alertActions.success('Users lists retrieved'))
            },
            error => {
                dispatch(alertActions.error(error));
            }
        )

    }
} 

function deleteListRequest() {
    return { type: listConstants.DELETE_LIST_REQUEST };
}

function deleteListSuccess(payload) {
    return { type: listConstants.DELETE_LIST_SUCCESS, payload };
}

function deleteListFailure(message) {
    return { type: listConstants.DELETE_LIST_FAILURE, message };
}

function deleteList(list) {
    return dispatch => {
        dispatch(deleteListRequest());
        listService.deleteList(list.id)
        dispatch(deleteListSuccess(list.id))
        // .then(
        //     list => {
                dispatch(deleteListSuccess(list.id))
                dispatch(alertActions.success('List was deleted'))
            // },
            // error => {
            //     dispatch(deleteListFailure(error));
            //     dispatch(alertActions.error(error, `could not delete list ${list.id}`));
            // }
        // )
    }
}

function deleteListItemRequest() {
    return { type: listConstants.DELETE_LIST_ITEM_REQUEST };
}

function deleteListItemSuccess(payload) {
    return { type: listConstants.DELETE_LIST_ITEM_SUCCESS, payload };
}

function deleteListItemFailure(message) {
    return { type: listConstants.DELETE_LIST_ITEM_FAILURE, message };
}

function deleteListItem(listItem) {
    return dispatch => {
        dispatch(deleteListItemRequest());
        listService.deleteListItem(listItem.id)
        // return value of backend is now all user lists
        .then(lists => {
            dispatch(deleteListItemSuccess(lists))
            dispatch(alertActions.success("List item was deleted"));
          }, error => {
            dispatch(deleteListItemFailure(error));
            dispatch(alertActions.error(error, `could not delete list ${listItem.id}`));
          });
    }
}

