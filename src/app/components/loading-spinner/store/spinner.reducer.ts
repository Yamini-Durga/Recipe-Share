import { createReducer, on } from '@ngrx/store';
import { setErrorMessage, setSpinnerStatus } from './spinner.action';
import { SpinnerState } from './spinner.state';

export const initialState: SpinnerState = {
  isLoading: false,
  errorMessage: '',
};

export const _spinnerReducer = createReducer(
  initialState,
  on(setSpinnerStatus, (state, action) => {
    return {
      ...state,
      isLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export function SpinnerReducer(state, action) {
  return _spinnerReducer(state, action);
}
