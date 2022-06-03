import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserLocalId } from 'src/app/auth/store/auth.selector';
import {
  setErrorMessage,
  setSpinnerStatus,
} from 'src/app/components/loading-spinner/store/spinner.action';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'],
})
export class EditRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  ingredients: Ingredient[] = [];
  userLocalId: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public recipeData: Recipe,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      recipename: new FormControl(this.recipeData.name, [
        Validators.required,
        Validators.minLength(6),
      ]),
      imageurl: new FormControl(this.recipeData.imageUrl),
      ingredient: new FormGroup({
        name: new FormControl(null),
        quantity: new FormControl(null),
      }),
      instructions: new FormControl(this.recipeData.instructions, [
        Validators.required,
        Validators.minLength(15),
      ]),
    });
    this.ingredients = this.recipeData.ingredients;
  }

  onUpdateRecipe() {
    this.store.dispatch(setSpinnerStatus({ status: true }));
    this.store.select(getUserLocalId).subscribe((localid) => {
      this.userLocalId = localid;
    });
    this.recipeData = {
      id: this.recipeData.id,
      name: this.recipeForm.value.recipename,
      imageUrl: this.recipeForm.value.imageurl,
      ingredients:
        this.ingredients.length === 0
          ? [
              {
                name: this.recipeForm.value.ingredient.name,
                quantity: this.recipeForm.value.ingredient.quantity,
              },
            ]
          : this.ingredients,
      instructions: this.recipeForm.value.instructions,
      localId: this.userLocalId,
    };
    this.recipeService.updateRecipe(this.recipeData).subscribe(
      (data) => {
        this.store.dispatch(setSpinnerStatus({ status: false }));
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.store.dispatch(setSpinnerStatus({ status: false }));
        this.store.dispatch(setErrorMessage({ message: error }));
      }
    );
    this.ingredients = [];
    this.recipeForm.reset();
  }

  onAddIngredient() {
    this.ingredients.push({
      name: this.recipeForm.value.ingredient.name,
      quantity: this.recipeForm.value.ingredient.quantity,
    });
  }
}
