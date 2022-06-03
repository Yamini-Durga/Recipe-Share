import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserLocalId } from 'src/app/auth/store/auth.selector';
import {
  setErrorMessage,
  setSpinnerStatus,
} from 'src/app/components/loading-spinner/store/spinner.action';
import { RecipeService } from 'src/app/services/recipe.service';
import { AppState } from 'src/app/store/app.state';
import { Ingredient } from '../../models/ingredient.model';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  ingredients: Ingredient[] = [];
  recipeForm: FormGroup;
  recipe: Recipe;
  userLocalId: string;
  constructor(
    private dialogRef: MatDialogRef<AddRecipeComponent>,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      recipename: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      imageurl: new FormControl(null),
      ingredient: new FormGroup({
        name: new FormControl(null, [Validators.required]),
        quantity: new FormControl(null, Validators.required),
      }),
      instructions: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
      ]),
    });
  }

  onAddRecipe(): void {
    this.store.dispatch(setSpinnerStatus({ status: true }));
    this.store.select(getUserLocalId).subscribe((localid) => {
      this.userLocalId = localid;
    });
    this.recipe = {
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
    this.recipeService.addRecipe(this.recipe).subscribe(
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
