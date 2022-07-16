import { createSelector } from '@reduxjs/toolkit';

const getUserInfo = state => state.user;
const getBloodType = state => state.user.bloodType;

const authSelectors = {
  getBloodType,
  getUserInfo
};
export default authSelectors;
