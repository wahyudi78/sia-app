import axios from "axios";

const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers = {
      Authorization: "Bearer " + token,
    };
  } else {
    delete axios.default.heders.Authorization;
  }
};

export default setAuthHeader;
