import axios from 'axios';

axios.defaults.baseURL = 'https://slim-mom-server.herokuapp.com/api';


export const getCaloriesInfoPublic = async (body) => {
  const response = await axios.post('/users/public/daily-calorie-intake', body);
  return response.data;
};