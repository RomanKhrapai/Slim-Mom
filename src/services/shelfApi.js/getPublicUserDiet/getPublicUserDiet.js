import axios from 'axios';

export default async function getPublicUserDiet({
  height,
  age,
  currentWeight,
  desiredWeight,
  bloodType,
  language,
}) {
  const { data } = await axios({
    method: 'post',
    url: '/users/public/daily-calorie-intake',
    data: { height, age, currentWeight, desiredWeight, bloodType, language },
  });
  return data;
}
