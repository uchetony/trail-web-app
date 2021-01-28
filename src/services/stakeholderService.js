import http from "./httpService";

const apiUrl = "http://localhost:5000/api";

const stakeholdersEndpoint = `${apiUrl}/stakeholders`;

export const getStakeholders = () => {
  return http.get(stakeholdersEndpoint);
};
