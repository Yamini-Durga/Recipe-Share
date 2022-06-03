import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { setErrorMessage } from '../components/loading-spinner/store/spinner.action';
import { AuthResponse } from '../models/authresponse.model';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';
import { logoutAction } from './store/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  clearInterval: any;
  user$ = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.authenticateGetCalls();
  }

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_WEB_API_KEY}`;

    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  signup(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_WEB_API_KEY}`;

    return this.http.post<AuthResponse>(url, {
      email,
      password,
      returnSecureToken: true,
    });
  }

  formatUser(userdata: AuthResponse) {
    const expirationDate = new Date(
      new Date().getTime() + +userdata.expiresIn * 1000
    );
    const user = new User(
      userdata.email,
      userdata.idToken,
      userdata.localId,
      expirationDate
    );
    return user;
  }

  storeUserInLocalStorage(user: User) {
    localStorage.setItem('userdata', JSON.stringify(user));
    this.logoutOnExpiredTime(user.expireTime);
  }

  getUserFromLocalStorage() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    if (userData) {
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.logoutOnExpiredTime(user.expireTime);
      return user;
    }
    return null;
  }

  logoutOnExpiredTime(expirationTime: any) {
    const currentTime = new Date().getTime();
    const timeInterval = expirationTime - currentTime;
    this.clearInterval = setTimeout(() => {
      this.store.dispatch(logoutAction());
    }, timeInterval);
  }

  logout() {
    localStorage.removeItem('userdata');
    if (this.clearInterval) {
      clearTimeout(this.clearInterval);
      this.clearInterval = null;
    }
  }

  authenticateGetCalls() {
    this.login(environment.ADMIN_U, environment.ADMIN_P)
      .pipe(
        map((data) => {
          this.user$.next(this.formatUser(data));
        }),
        catchError((errorRes) => {
          return of(
            setErrorMessage({
              message: 'Firebase is not reachable, please try again...',
            })
          );
        })
      )
      .subscribe();
  }
}
