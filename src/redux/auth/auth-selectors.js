import { createSelector } from '@reduxjs/toolkit';

const getUserInfo = state => state.user;
const getBloodType = state => state.user.bloodType;
console.log(getBloodType);

const authSelectors = {
  getBloodType,
  getUserInfo
};
export default authSelectors;
