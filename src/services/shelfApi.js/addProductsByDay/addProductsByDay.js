import axios from 'axios';

export default async function addProductsByDay({ date, productId, amount }) {
  const { data } = await axios({
    method: 'post',
    url: `/diary`,
    data: { date, productId, amount },
  });
  return data;
}
