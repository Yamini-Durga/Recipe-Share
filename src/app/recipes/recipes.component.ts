import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { RecipeService } from '../services/recipe.service';
import { AddRecipeComponent } from '../shared/components/add-recipe/add-recipe.component';
import { RecipePramas } from '../shared/models/recipe-params';
import { Recipe } from '../shared/models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  sortOptions = [
    { name: 'A - Z', value: 'asc' },
    { name: 'Z - A', value: 'desc' }
  ];
  recipes: Recipe[];
  recipePramas = new RecipePramas();
  @ViewChild('search') searchRef: ElementRef;
  
  constructor(private recipeService: RecipeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  getAllRecipes(){
    this.recipeService.getRecipes(this.recipePramas).subscribe(
      (data) => {
        this.recipes = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }  
  onSortSelected(event: MatSelectChange){
    this.recipePramas.direction = event.value;
    this.getAllRecipes();
  }
  onSearch() {
    this.recipePramas.search = this.searchRef.nativeElement.value;
    this.getAllRecipes();
  }
  onReset() {
    this.searchRef.nativeElement.value = '';
    this.recipePramas = new RecipePramas();
    this.getAllRecipes();
  }
  onAddRecipe(){
    const dialogRef = this.dialog.open(AddRecipeComponent);
    dialogRef.afterClosed().subscribe(data => {
      this.getAllRecipes();
    })
  }
}
