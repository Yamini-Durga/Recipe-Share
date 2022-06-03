import { AuthState } from '../auth/store/auth.state';
import { SpinnerState } from '../components/loading-spinner/store/spinner.state';
import { RecipeState } from '../recipes/recipe-details/store/recipeshare.reducers';

export interface AppState {
  recipe: RecipeState;
  spinner: SpinnerState;
  auth: AuthState;
}
