import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { RecipeService } from '../services/recipe.service';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { RecipePramas } from '../models/recipe-params';
import { Recipe } from '../models/recipe.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import {
  setErrorMessage,
  setSpinnerStatus,
} from '../components/loading-spinner/store/spinner.action';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../auth/store/auth.selector';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  sortOptions = [
    { name: 'A - Z', value: 'asc' },
    { name: 'Z - A', value: 'desc' },
  ];
  recipes: Recipe[];
  recipePramas = new RecipePramas();
  @ViewChild('search') searchRef: ElementRef;
  isAuthenticated: Observable<boolean>;
  usertoken: string;

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.authService.user$.subscribe((user) => {
      if(user){
        this.usertoken = user.userToken;
        this.getAllRecipes();
      }
    } );
  }

  getAllRecipes() {
    this.store.dispatch(setSpinnerStatus({ status: true }));
    this.recipeService.getRecipes(this.recipePramas, this.usertoken).subscribe(
      (data) => {
        this.recipes = data;
        this.store.dispatch(setSpinnerStatus({ status: false }));
        this.store.dispatch(setErrorMessage({ message: '' }));
      },
      (error) => {
        this.store.dispatch(setSpinnerStatus({ status: false }));
        this.store.dispatch(
          setErrorMessage({ message: error.error.error.message })
        );
      }
    );
  }

  onSortSelected(event: MatSelectChange) {
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

  onAddRecipe() {
    const dialogRef = this.dialog.open(AddRecipeComponent);
    dialogRef.afterClosed().subscribe((data) => {
      this.getAllRecipes();
    });
  }
}
