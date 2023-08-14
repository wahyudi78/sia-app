import api from "./api";

// const resource = "/auth/login";

// export const authLogin = (data) => api.post("/auth/login", data);

export const authLogout = (mapel) => api.post("/auth/logout", mapel);

export const authLogin = async () => {
  try {
    const response = await api.post(resource, data, {
      headers: { Authorization: getAuthorizationHeader() },
    });

    return response;
  } catch (error) {
    // error handling
  }
};

export const authLogout = async () => {
  try {
    const response = await api.post("/auth/logout", data, {
      headers: { Authorization: getAuthorizationHeader() },
    });

    return response;
  } catch (error) {
    // error handling
  }
};
