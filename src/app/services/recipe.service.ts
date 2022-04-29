import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../shared/models/recipe.model';
import { map } from 'rxjs/operators';
import { RecipePramas } from '../shared/models/recipe-params';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  apiUrl = 'http://localhost:3000';
  totalItems = 0;

  constructor(private http: HttpClient) { }

  getRecipes(recipePramas: RecipePramas){
    let params = new HttpParams();
    if(recipePramas.direction) {
      params = params.append('_sort', 'name');
      params = params.append('_order', recipePramas.direction);
    }
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`, {params})
    .pipe(
      map(data => {
        this.totalItems = data.length;
        if(recipePramas.search)
        {
          let filteredRecipes = data.filter(r => 
            r.name.toLowerCase().includes(recipePramas.search.toLowerCase()));
          return filteredRecipes;
        }
        return data;
      })
    );
  }

  getRecipe(id: number){
    return this.http.get<Recipe>(`${this.apiUrl}/recipes/${id}`);
  }

  addRecipe(recipe: Recipe){
    let recipeItem = {
      'id': this.totalItems + 1,
      ...recipe
    }
    return this.http.post(`${this.apiUrl}/recipes/`, recipeItem);
  }
}
