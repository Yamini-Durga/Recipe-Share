import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap, take } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { getUserToken } from './store/auth.selector';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(getUserToken).pipe(
      take(1),
      exhaustMap((token) => {
        if (!token) return next.handle(req);
        let modifiedReq = req.clone({
          params: req.params.append('auth', token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
