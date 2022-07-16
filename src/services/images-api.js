import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27534164-ac67924df2b02df41d2da9fc8';

const axiosIstance = axios.create({
  baseURL: BASE_URL,
});

const getImages = async (q, page, handleError) => {
  try {
    const { data } = await axiosIstance.get('', {
      params: {
        key: API_KEY,
        q,
        page: page,
        per_page: 12,
        image_type: 'photo',
      },
    });

    return data;
  } catch (error) {
    handleError(error);
  }
};

export { getImages };
