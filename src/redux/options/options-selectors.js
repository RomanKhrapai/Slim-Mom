
import { createSelector } from '@reduxjs/toolkit';
const getIsFetchingCurent = state => state.options.isFetchingCurrentUser;
const getIsLoading = state => state.options.isLoading;
const getIsAuthorised = state => state.options.isAuthorised;
const getUserInfo = state => state.user;
const getBloodType = state => state.user.bloodType;

const authSelectors = {
  getIsFetchingCurent,
  getIsAuthorised,
  getIsLoading,
  getBloodType,
  getUserInfo
};
export default authSelectors;
