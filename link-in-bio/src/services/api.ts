import axios from 'axios'; // Used this library for the HTTP calls.

const API_BASE_URL = 'http://localhost:3000'; // We can change this URL, once deploy on server.

export const appendParameters = async (url: string, parameters: string) => {
  const response = await axios.post(`${API_BASE_URL}/append-parameters`, { url, parameters });
  return response.data;
};

export const getLinks = async (page: number = 1, limit: number = 10) => {
  const response = await axios.get(`${API_BASE_URL}/links`, {
    params: { page, limit },
  });
  return response.data;
};
