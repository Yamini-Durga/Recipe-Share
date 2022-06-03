import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpinnerState } from './spinner.state';

export const getSpinnerState = createFeatureSelector<SpinnerState>('spinner');

export const getSpinnerStatus = createSelector(getSpinnerState, (state) => {
  return state.isLoading;
});

export const getErrorMessage = createSelector(getSpinnerState, (state) => {
  return state.errorMessage;
});
