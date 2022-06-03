import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { AppState } from 'src/app/store/app.state';
import { loadRecipeDetailsEffectsAction } from './store/recipeshare.actions';
import { getRecipeDetails } from './store/recipeshare.selectors';
import { skip, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import {
  setErrorMessage,
  setSpinnerStatus,
} from 'src/app/components/loading-spinner/store/spinner.action';
import { Observable } from 'rxjs';
import {
  getUserLocalId,
  isAuthenticated,
} from 'src/app/auth/store/auth.selector';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe;
  defaultImage = '/assets/placeholder.png';
  isAuthenticated: Observable<boolean>;
  userLocalId = '';
  usertoken: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private recipeService: RecipeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
    this.store.select(getUserLocalId).subscribe((localid) => {
      this.userLocalId = localid;
    });
    this.authService.user$.subscribe((user) => {
      if(user){
        this.usertoken = user.userToken;
        this.getRecipeById();
      }
    } );
  }

  getRecipeById() {
    const id = this.activatedRoute.snapshot.params.id;
    this.store.dispatch(loadRecipeDetailsEffectsAction({ recipeId: id, userToken: this.usertoken }));

    this.store
      .pipe(
        select(getRecipeDetails),
        skip(1),
        tap((data: any) => {
          this.store.dispatch(setSpinnerStatus({ status: false }));
          if (data) {
            let recipe = {
              id: data.id,
              name: data.name,
              imageUrl: data.imageUrl,
              instructions: data.instructions,
              ingredients: data.ingredients,
              localId: data.localId,
            };
            this.recipe = recipe;
          }
        })
      )
      .subscribe();
  }

  onEditRecipe() {
    const dialogRef = this.dialog.open(EditRecipeComponent, {
      data: this.recipe,
    });
  }

  onDeleteRecipe() {
    if (confirm('Are you sure, you want to delete this post?')) {
      this.store.dispatch(setSpinnerStatus({ status: true }));
      this.recipeService.deleteRecipe(this.recipe.id).subscribe(
        (data) => {
          this.store.dispatch(setSpinnerStatus({ status: false }));
          this.router.navigateByUrl('/');
        },
        (error) => {
          this.store.dispatch(setSpinnerStatus({ status: false }));
          this.store.dispatch(setErrorMessage({ message: error }));
        }
      );
    }
  }
}
