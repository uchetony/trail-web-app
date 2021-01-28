import http from "./httpService";

const { REACT_APP_API_URL: apiUrl } = process.env;

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

export const getStakeholderUsers = (stakeholderId) => {
  return http.get(`${usersEndpoint}/stakeholders/${stakeholderId}`);
};
