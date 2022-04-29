import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipeById();
  }

  getRecipeById(){
    const id = +this.activatedRoute.snapshot.params.id;
    this.recipeService.getRecipe(id).subscribe(
      (recipe) => this.recipe = recipe,
      (error) => console.log(error)
    );
  }

}
