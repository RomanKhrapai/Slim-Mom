import axios from 'axios';

export default async function deleteProductsByDay(productId) {
  const { data } = await axios({
    method: 'delete',
    url: `/diary/${productId}`,
  });
  return data;
}
