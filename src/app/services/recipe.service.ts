import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { map } from 'rxjs/operators';
import { RecipePramas } from '../models/recipe-params';
import * as _ from 'lodash';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  totalItems = 0;
  user: User;
  constructor(private http: HttpClient) {
  }

  getRecipes(recipePramas: RecipePramas, token: string) {
    const url = `https://recipe-share-ceebe-default-rtdb.firebaseio.com/recipes.json`;
    let params = new HttpParams();
    if (token) {
      params = params.append('auth', token);
    }

    return this.http.get<Recipe[]>(url, { params: params }).pipe(
      map((data) => {
        let recipes: Recipe[] = [];
        for (let key in data) {
          recipes.push({ id: key, ...data[key] });
        }
        let filteredRecipes = [];
        if (recipePramas.search) {
          filteredRecipes = recipes.filter((r) =>
            r.name.toLowerCase().includes(recipePramas.search.toLowerCase())
          );
          recipes = filteredRecipes;
        }
        if (recipePramas.direction) {
          recipes = _.orderBy(recipes, ['name'], [recipePramas.direction]);
        }
        this.totalItems = recipes.length;
        return recipes;
      })
    );
  }

  getRecipe(id: number, token: string) {
    const url = `https://recipe-share-ceebe-default-rtdb.firebaseio.com/recipes/${id}.json`;
    let params = new HttpParams();
    if (token) {
      params = params.append('auth', token);
    }

    return this.http.get<Recipe>(url, { params: params }).pipe(
      map((data) => {
        return { ...data, id };
      })
    );
  }

  addRecipe(recipe: Recipe) {
    const url = `https://recipe-share-ceebe-default-rtdb.firebaseio.com/recipes.json`;
    return this.http.post(url, recipe);
  }

  updateRecipe(recipe: Recipe) {
    const recipeData = {
      [recipe.id]: {
        name: recipe.name,
        imageUrl: recipe.imageUrl,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        localId: recipe.localId,
      },
    };
    const url = `https://recipe-share-ceebe-default-rtdb.firebaseio.com/recipes.json`;
    return this.http.patch(url, recipeData);
  }

  deleteRecipe(id: string) {
    const url = `https://recipe-share-ceebe-default-rtdb.firebaseio.com/recipes/${id}.json`;
    return this.http.delete(url);
  }
}
