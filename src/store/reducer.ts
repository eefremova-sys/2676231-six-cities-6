import { combineReducers } from '@reduxjs/toolkit';
import appProcess from './appProcess/appProcess';
import offersProcess from './offersProcess/offersProcess';
import userProcess from './userProcess/userProcess';

const rootReducer = combineReducers({
  app: appProcess,
  offers: offersProcess,
  user: userProcess,
});

export default rootReducer;
