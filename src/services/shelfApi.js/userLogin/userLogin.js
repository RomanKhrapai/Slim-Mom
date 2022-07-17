import axios from 'axios';

export default async function userLogin({ email, password }) {
  const { data } = await axios({
    method: 'post',
    url: '/auth/login',
    data: { email, password },
  });
  return data;
}
