import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RecipesItemComponent } from './recipes-item/recipes-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesItemComponent,
    RecipeDetailsComponent,
    AddRecipeComponent,
    EditRecipeComponent,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class RecipesModule {}
