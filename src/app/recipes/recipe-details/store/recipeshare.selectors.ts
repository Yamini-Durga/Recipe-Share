import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

export const getRecipe = createFeatureSelector<AppState>('recipe');

export const getRecipeDetails = createSelector(getRecipe, (state) => {
  return state.recipe;
});
