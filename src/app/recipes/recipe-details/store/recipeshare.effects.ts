import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { setSpinnerStatus } from 'src/app/components/loading-spinner/store/spinner.action';
import { RecipeService } from 'src/app/services/recipe.service';
import { AppState } from 'src/app/store/app.state';
import {
  loadRecipeDetailsEffectsAction,
  loadRecipeDetailsAction,
} from './recipeshare.actions';

@Injectable()
export class RecipeDetailsEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) {}

  loadRecipeDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecipeDetailsEffectsAction),
      mergeMap((action) => {
        return this.recipeService.getRecipe(action.recipeId, action.userToken).pipe(
          catchError(() => {
            this.store.dispatch(setSpinnerStatus({ status: false }));
            return of(loadRecipeDetailsAction({ recipe: null }));
          }),
          map((data: any) => loadRecipeDetailsAction({ recipe: data }))
        );
      })
    )
  );
}
