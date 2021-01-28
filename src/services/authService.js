import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiUrl = "http://localhost:5000/api";
const tokenKey = "trail_token";

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
