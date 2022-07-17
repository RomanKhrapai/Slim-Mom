import { createSelector } from '@reduxjs/toolkit';

const getUserInfo = state => state.user;
const getDiaryProducts = state => state.user.diary;
const getChosenDate = state => state.products.chosenDate;
// Такого в новом стейте нет
const getTodayDate = state => state.user.currentDate;
// 
const productsSelectors = {
  getUserInfo,
  getDiaryProducts,
  getChosenDate,
  getTodayDate,
};
export default productsSelectors;
