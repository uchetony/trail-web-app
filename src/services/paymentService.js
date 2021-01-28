import http from "./httpService";

const { REACT_APP_API_URL: apiUrl } = process.env;

const paymentsEndpoint = `${apiUrl}/payments`;

const userUrl = (userId) => {
  return `${paymentsEndpoint}/${userId}`;
};

export const verifyUserPayment = (userId, paymentDetails) => {
  return http.post(`${userUrl(userId)}/verify`, paymentDetails);
};
