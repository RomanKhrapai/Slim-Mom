import { createSelector } from '@reduxjs/toolkit';
const getIsFetchingCurent = state => state.auth.isFetchingCurrentUser;
const getIsLoading = state => state.auth.isLoading;
const getIsAuthorised = state => state.auth.isAuthorised;
const getUserInfo = state => state.user;
const getBloodType = state => state.auth.user.bloodType;

const authSelectors = {
  getIsFetchingCurent,
  getIsAuthorised,
  getIsLoading,
  getBloodType,
  getUserInfo,
};
export default authSelectors;
