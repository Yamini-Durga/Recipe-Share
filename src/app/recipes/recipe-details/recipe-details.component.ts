import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AppState } from 'src/app/recipes/store/recipeshare.state';
import { loadRecipeDetailsAction, loadRecipeDetailsEffectsAction } from './store/recipeshare.actions';
import { getRecipeDetails } from './store/recipeshare.selectors';
import { skip, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  constructor(private activatedRoute: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getRecipeById();
  }

  getRecipeById(){
    const id = +this.activatedRoute.snapshot.params.id;
    this.store.dispatch(loadRecipeDetailsEffectsAction({recipeId: id}));

    this.store.pipe(
        select(getRecipeDetails), 
        skip(1),
        tap((data: any) => {
          if(data) {
            let recipe = {
              'id': data.id,
              'name': data.name,
              'imageUrl': data.imageUrl,
              'instructions': data.instructions,
              'ingredients': data.ingredients
            }
            this.recipe = recipe;
          }
        })
      ).subscribe();
  }

}
