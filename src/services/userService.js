import http from "./httpService";

const apiUrl = "http://localhost:5000/api";

const usersEndpoint = `${apiUrl}/users`;

const userUrl = (userId) => {
  return `${usersEndpoint}/${userId}`;
};

export const registerUser = (userData) => {
  return http.post(usersEndpoint, userData);
};

export const verifyUserEmail = (userId, email) => {
  return http.post(`${userUrl(userId)}/verify/email`, { email });
};

export const setUserBillingData = (userId, billingDetails) => {
  return http.post(`${userUrl(userId)}/billing`, billingDetails);
};
