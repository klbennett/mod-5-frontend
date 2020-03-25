import { authHeader } from "../helpers";

export const userService = {
  login,
  logout,
  register,
  getAll,
  getById
  // update,
  // delete: _delete
};

const backendURL = process.env.BACKEND_URL;

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      mode: "no-cors"
    },
    body: JSON.stringify({ username, password })
  };

  return fetch(backendURL + "/login", requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Now logged in as" + user);
      }
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(backendURL + `/users`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(backendURL + `users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(backendURL + `/signup`, requestOptions).then(handleResponse);
}

// function update(user) {
//   const requestOptions = {
//     method: "PUT",
//     headers: { ...authHeader(), "Content-Type": "application/json" },
//     body: JSON.stringify(user)
//   };

//   return fetch(`/users/${user.id}`, requestOptions).then(handleResponse);
// }

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
