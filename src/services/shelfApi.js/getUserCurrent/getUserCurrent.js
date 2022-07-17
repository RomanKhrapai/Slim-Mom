import axios from 'axios';

export default async function getUserCurrent() {
  const { data } = await axios({
    method: 'get',
    url: '/auth/register',
  });
  return data;
}
