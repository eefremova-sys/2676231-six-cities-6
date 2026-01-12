import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../user';
import { AuthStatus } from '../../const';
import { requireAuthorization, setUser, logout } from '../action';

interface UserState {
  authStatus: AuthStatus;
  user: User | null;
}

const initialState: UserState = {
  authStatus: AuthStatus.Unknown,
  user: null,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout, (state) => {
      state.authStatus = AuthStatus.NoAuth;
      state.user = null;
    });
});

export default userProcess;

