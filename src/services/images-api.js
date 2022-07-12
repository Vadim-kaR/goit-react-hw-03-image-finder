import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27534164-ac67924df2b02df41d2da9fc8';

const axiosIstance = axios.create();

const getImages = async (query, page) => {
  try {
    const { data } = await axiosIstance.get(
      `${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&page=${page}&per_page=12`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getImages };
