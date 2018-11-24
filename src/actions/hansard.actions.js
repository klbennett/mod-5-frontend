// export const alertActions = {
//     fetchHansard,
//     error,
//     clear
// };

// const MY_API_KEY = "c39a26d9c12f48dba2a5c00e35684ecc";

// export const fetchHansard = (dispatch, result) => {
//     return dispatch({
//         type: FETCH_HANSARD,
//         payload: result
//     })
// };

// export const requestHansard = () => ({
//     type: REQUEST_HANSARD,
// });

// export const receivedHansard = json => ({
//     type: RECEIVE_HANSARD,
//     json: json,
// });

// export function getHansard(channel) {
//     return function (dispatch) {
//         dispatch(requestHansard());
//         return fetch(`URL`)
//             .then(
//                 response => response.json(),
//                 error => console.log('An error occurred.', error),
//             )
//             .then((json) => {
//                 dispatch(receivedHansard(json));
//             },
//             );
//     };
// }