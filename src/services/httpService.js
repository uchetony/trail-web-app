import axios from "axios";
import logger from "./logService";
import { NotificationManager } from "react-notifications";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    NotificationManager.error("Could not connect to server", "Error!", 5000);
    logger.log(error);
  }

  return Promise.reject(error);
});

const setJwt = (jwt) => {
  axios.defaults.headers.common["x-auth-token"] = jwt;
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
