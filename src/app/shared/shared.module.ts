import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RecipesModule } from '../recipes/recipes.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddRecipeComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RecipesModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    AddRecipeComponent
  ]
})
export class SharedModule { }
