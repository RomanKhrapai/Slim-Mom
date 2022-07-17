import axios from 'axios';

export default async function getProductsBySearch({ string }) {
  const { data } = await axios({
    method: 'get',
    url: `/products?title=${string}`,
  });
  return data.data.result;
}
