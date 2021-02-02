import axios from 'axios';

const API_URL = 'https://core.ac.uk:443/api-v2';
const API_KEY = 'Y7wOU2hnE95zTbCM3oDcy8fQHWANupFs';

export const PAGE_SIZE = 12;

export const getArticles = async (query, page) => {
  const { data } = await axios.get(`${API_URL}/search/${query}`, {
    params: {
      page: page,
      pageSize: PAGE_SIZE,
      apiKey: API_KEY,
    },
  });

  return data;
};
