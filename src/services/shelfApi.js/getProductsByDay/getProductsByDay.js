import axios from 'axios';

export default async function getProductsByDay() {
  const { date } = await axios({
    method: 'get',
    url: `/diary/${date}`,
  });
  return data;
}
