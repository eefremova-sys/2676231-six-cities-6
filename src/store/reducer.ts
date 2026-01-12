import { combineReducers } from '@reduxjs/toolkit';
import appProcess from './appProcess/app-process';
import offersProcess from './offersProcess/offersProcess';
import userProcess from './userProcess/userProcess';
import reviewsProcess from './reviewsProcess/reviewsProcess';

const rootReducer = combineReducers({
  app: appProcess,
  offers: offersProcess,
  user: userProcess,
  reviews: reviewsProcess,
});

export default rootReducer;
