import http from "./httpService";
import jwtDecode from "jwt-decode";

const {
  REACT_APP_API_URL: apiUrl,
  REACT_APP_TOKEN_KEY: tokenKey,
} = process.env;

const authEndpoint = `${apiUrl}/auth`;

const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

http.setJwt(getJwt());

export const signIn = async (email, password) => {
  const {
    data: { token: jwt },
  } = await http.post(authEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

export const signInWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const signOut = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (error) {}
};

export default {
  signIn,
  signInWithJwt,
  signOut,
  getCurrentUser,
};
