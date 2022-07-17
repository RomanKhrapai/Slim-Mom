import axios from 'axios';

export default async function userLogout() {
  const { data } = await axios({
    method: 'get',
    url: '/auth/logout',
  });
  return data;
}
