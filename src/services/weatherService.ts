import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;

      if (status === 404) {
        throw new Error('City not found');
      } else if (status === 401) {
        throw new Error('Invalid API key');
      } else {
        throw new Error('Something went wrong. Please try again later.');
      }
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Unexpected error occurred');
    }
  }
};
