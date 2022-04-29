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

const routes: Routes = [];

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesItemComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FlexLayoutModule ,
    RouterModule.forChild(routes)
  ],
  exports: [
    RecipesComponent,
    MatButtonModule
  ]
})
export class RecipesModule { }
