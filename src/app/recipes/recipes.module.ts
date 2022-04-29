import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RecipesItemComponent } from './recipes-item/recipes-item.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipesItemComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  exports: [
    RecipesComponent,
    MatButtonModule
  ]
})
export class RecipesModule { }
