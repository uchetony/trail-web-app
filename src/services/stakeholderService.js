import http from "./httpService";

const { REACT_APP_API_URL: apiUrl } = process.env;

const stakeholdersEndpoint = `${apiUrl}/stakeholders`;

export const getStakeholders = () => {
  return http.get(stakeholdersEndpoint);
};
