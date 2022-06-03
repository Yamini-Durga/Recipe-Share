import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../../../models/recipe.model';
import { loadRecipeDetailsAction } from './recipeshare.actions';

export interface RecipeState {
  recipe: Recipe;
}

export const initialState: RecipeState = {
  recipe: undefined,
};

const _recipeReducer = createReducer(
  initialState,
  on(loadRecipeDetailsAction, (state, action) => {
    return {
      ...state,
      recipe: action.recipe,
    };
  })
);

export function recipeReducer(state, action) {
  return _recipeReducer(state, action);
}
