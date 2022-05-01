import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { RecipeService } from "src/app/services/recipe.service";
import { loadRecipeDetailsEffectsAction, loadRecipeDetailsAction } from "./recipeshare.actions";


@Injectable()
export class RecipeDetailsEffects {
    constructor(private actions$: Actions, private recipeService: RecipeService) {}

    loadRecipeDetails$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadRecipeDetailsEffectsAction),
            mergeMap((action) => {
                return this.recipeService.getRecipe(action.recipeId)
                    .pipe(
                        catchError(() => {
                            return of(loadRecipeDetailsAction({recipe: null}));
                        }),
                        map((data: any) => 
                            loadRecipeDetailsAction({recipe: data})
                        )
                    )
            })
        )
    );
}