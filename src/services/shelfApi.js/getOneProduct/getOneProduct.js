import axios from 'axios';

export default async function getOneProduct({ product }) {
  const { data } = await axios({
    method: 'get',
    url: `/products/${product}`,
    product,
  });
  return data;
}
