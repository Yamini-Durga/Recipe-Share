import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from '../../models/ingredient.model';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  ingredients: Ingredient[] = [];
  recipeForm: FormGroup;
  recipe: Recipe;
  constructor(private dialogRef: MatDialogRef<AddRecipeComponent>,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      'recipename': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'imageurl': new FormControl(null),
      'ingredient': new FormGroup({
        'name': new FormControl(null, [Validators.required, Validators.minLength(3)]),
        'quantity': new FormControl(null, Validators.required)
      }),
      'instructions': new FormControl(null, [Validators.required, Validators.minLength(15)])
    })
  }

  onAddRecipe(): void {
    this.recipe = {
      'name': this.recipeForm.value.recipename,
      'imageUrl': this.recipeForm.value.imageurl,
      'ingredients': this.ingredients.length === 0 ? [{
            'name': this.recipeForm.value.ingredient.name,
            'quantity': this.recipeForm.value.ingredient.quantity
        }] : this.ingredients,
      'instructions': this.recipeForm.value.instructions
    }
    this.recipeService.addRecipe(this.recipe).subscribe(
      (data) => this.router.navigateByUrl('/'),
      (error) => console.log(error)
    );
    this.ingredients = [];
    this.recipeForm.reset();
  }
  onAddIngredient() {
    this.ingredients.push({
      'name': this.recipeForm.value.ingredient.name,
      'quantity': this.recipeForm.value.ingredient.quantity
    });
  }
}
