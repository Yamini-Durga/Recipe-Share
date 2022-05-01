import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RecipesModule } from './recipes/recipes.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './recipes/recipe-details/store/recipeshare.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RecipeDetailsEffects } from './recipes/recipe-details/store/recipeshare.effects';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    RecipesModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({
      recipe: recipeReducer
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([RecipeDetailsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
