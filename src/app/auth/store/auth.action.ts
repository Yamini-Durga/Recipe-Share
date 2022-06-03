import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loginAction = createAction(
  '[Auth page] Login start',
  props<{ email: string; password: string }>()
);

export const loginSuccessAction = createAction(
  '[Auth page] Login success',
  props<{ user: User; redirect: boolean }>()
);

export const signupAction = createAction(
  '[Auth page] Signup start',
  props<{ email: string; password: string }>()
);

export const signupSuccessAction = createAction(
  '[Auth page] Signup success',
  props<{ user: User; redirect: boolean }>()
);

export const autoLoginAction = createAction('[Auth page] Auto login');

export const autoLoginFailed = createAction('[Auth page] Auto login failed');

export const logoutAction = createAction('[Auth page] Logout');
