import { Recipe } from '../../../models/recipe.model';
import { createAction, props } from '@ngrx/store';

export const loadRecipeDetailsAction = createAction(
  '[Rceipe Share Details Page] Recipe Share details component',
  props<{ recipe: Recipe }>()
);

export const loadRecipeDetailsEffectsAction = createAction(
  '[Rceipe Share Details Page] Effect for recipe detail by Id',
  props<{ recipeId: number, userToken: string }>()
);
