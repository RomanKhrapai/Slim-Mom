import axios from 'axios';

export  default async function userRegister({ name, email, password }) {
  const { data } = await axios({
    method: 'post',
    url: '/auth/register',
    data: { name, email, password },
  });
  return data;
}
