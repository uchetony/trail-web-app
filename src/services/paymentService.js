import http from "./httpService";

const apiUrl = "http://localhost:5000/api";

const paymentsEndpoint = `${apiUrl}/payments`;

const userUrl = (userId) => {
  return `${paymentsEndpoint}/${userId}`;
};

export const verifyUserPayment = (userId, paymentDetails) => {
  return http.post(`${userUrl(userId)}/verify`, paymentDetails);
};
