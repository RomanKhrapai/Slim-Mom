import { createSelector } from '@reduxjs/toolkit';

const getUserInfo = state => state.auth.user;
const getDiaryProducts = state => state.user.diary;
const getChosenDate = state => state.user.chosenDate;
const getTodayDate = state => state.user.currentDate;
const getProductsNotRecommended = state => state.user.productsNotRecommended;
const getDailyCalorieIntake = state => state.user.dailyCalorieIntake;

const productsSelectors = {
  getUserInfo,
  getDiaryProducts,
  getChosenDate,
  getTodayDate,
  getProductsNotRecommended,
  getDailyCalorieIntake,
};
export default productsSelectors;
