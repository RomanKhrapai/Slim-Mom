import axios from 'axios';
export default async function getPrivateUserDiet({
  height,
  age,
  currentWeight,
  desiredWeight,
  bloodType,
  language,
}) {
  const { data } = await axios({
    method: 'post',
    url: '/users/private/daily-calorie-intake',
    data: { height, age, currentWeight, desiredWeight, bloodType, language },
  });
  return data;
}
