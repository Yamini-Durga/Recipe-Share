import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  setErrorMessage,
  setSpinnerStatus,
} from 'src/app/components/loading-spinner/store/spinner.action';
import { AppState } from 'src/app/store/app.state';
import { AuthService } from '../auth.service';
import {
  autoLoginAction,
  autoLoginFailed,
  loginAction,
  loginSuccessAction,
  logoutAction,
  signupAction,
  signupSuccessAction,
} from './auth.action';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  signupEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupAction),
      mergeMap((action) => {
        return this.authService.signup(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setSpinnerStatus({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.storeUserInLocalStorage(user);
            return signupSuccessAction({ user, redirect: true });
          }),
          catchError((errorRes) => {
            this.store.dispatch(setSpinnerStatus({ status: false }));
            return of(
              setErrorMessage({
                message: errorRes.error.error.message,
              })
            );
          })
        );
      })
    );
  });

  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[signupSuccessAction, loginSuccessAction]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );

  loginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      mergeMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setSpinnerStatus({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            this.authService.storeUserInLocalStorage(user);
            return loginSuccessAction({ user, redirect: true });
          }),
          catchError((errorRes) => {
            this.store.dispatch(setSpinnerStatus({ status: false }));
            return of(
              setErrorMessage({
                message: errorRes.error.error.message,
              })
            );
          })
        );
      })
    );
  });

  logoutEffect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logoutAction),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );

  autoLoginEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLoginAction),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        if (user) {
          return of(loginSuccessAction({ user, redirect: false }));
        }
        return of(autoLoginFailed());
      })
    );
  });
}
