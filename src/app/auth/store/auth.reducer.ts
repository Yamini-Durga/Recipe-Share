import { createReducer, on } from '@ngrx/store';
import {
  loginSuccessAction,
  logoutAction,
  signupSuccessAction,
} from './auth.action';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  user: null,
};

export const _authReducer = createReducer(
  initialState,
  on(signupSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(loginSuccessAction, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(logoutAction, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}
