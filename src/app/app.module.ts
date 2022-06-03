import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RecipesModule } from './recipes/recipes.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './recipes/recipe-details/store/recipeshare.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RecipeDetailsEffects } from './recipes/recipe-details/store/recipeshare.effects';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SpinnerReducer } from './components/loading-spinner/store/spinner.reducer';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthReducer } from './auth/store/auth.reducer';
import { AuthEffects } from './auth/store/auth.effect';
import { AuthInterceptor } from './auth/authinterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoadingSpinnerComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    RecipesModule,
    HttpClientModule,
    StoreModule.forRoot({
      spinner: SpinnerReducer,
      recipe: recipeReducer,
      auth: AuthReducer,
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([RecipeDetailsEffects, AuthEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
