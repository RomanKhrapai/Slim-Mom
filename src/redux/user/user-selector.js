import { createSelector } from '@reduxjs/toolkit';

const getDiaryProducts = state => state.user.diary;
const getChosenDate = state => state.user.chosenDate;
const getTodayDate = state => state.user.currentDate;

const productsSelectors = {
  getDiaryProducts,
  getChosenDate,
  getTodayDate,
};
export default productsSelectors;
