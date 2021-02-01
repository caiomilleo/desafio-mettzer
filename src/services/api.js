import axios from 'axios';

const API_URL = 'https://core.ac.uk:443/api-v2';
const API_KEY = 'Y7wOU2hnE95zTbCM3oDcy8fQHWANupFs';

export const getArticles = async () => {
  const { data } = await axios.post(`${API_URL}/articles/search`, {
    data: {
      page: 1,
      pageSize: 10,
    },
    params: {
      apiKey: API_KEY,
    },
  });

  return data;
};
