import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const getUserState = createFeatureSelector<AuthState>('auth');

export const isAuthenticated = createSelector(getUserState, (state) => {
  return state.user ? true : false;
});

export const getUserToken = createSelector(getUserState, (state) => {
  return state.user ? state.user.userToken : null;
});

export const getUserLocalId = createSelector(getUserState, (state) => {
  return state.user ? state.user.userLocalId : null;
});
