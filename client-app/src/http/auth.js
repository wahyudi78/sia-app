import api from "./api";
import axios from "axios";


// export const authLogout = (mapel) => api.post("/auth/logout", mapel);

export const authLogin = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/", data);

    return response;
  } catch (error) {
    // error handling
  }
};

export const authLogout = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/auth/logout", data);

    return response;
  } catch (error) {
    // error handling
  }
};
