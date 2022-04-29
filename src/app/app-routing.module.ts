import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  { path: '', component: RecipesComponent, pathMatch: 'full' },
  { path: ':id', component: RecipeDetailsComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
