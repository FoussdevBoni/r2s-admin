// src/features/user/userSelectors.js
import { createSelector } from 'reselect';

const getUserData = (state) => state.user.userData;
const getLastFetchTime = (state) => state.user.lastFetchTime;

export const selectUserData = createSelector(
  [getUserData, getLastFetchTime],
  (userData, lastFetchTime) => {
    if (userData && Date.now() - lastFetchTime < 1000 * 60 * 10) {
      return userData;
    }
    return null;
  }
);
