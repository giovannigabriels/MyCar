const urlBase = "http://localhost:3000";

export const login = (payload) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/users/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("id_user", data.id);
      });
  };
};

export const register = (payload) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/users/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    });
  };
};
