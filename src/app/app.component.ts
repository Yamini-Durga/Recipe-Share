import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { autoLoginAction } from './auth/store/auth.action';
import { setSpinnerStatus } from './components/loading-spinner/store/spinner.action';
import {
  getErrorMessage,
  getSpinnerStatus,
} from './components/loading-spinner/store/spinner.selector';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading: Observable<boolean>;
  errorMessage: string;
  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(setSpinnerStatus({ status: true }));
  }

  ngOnInit(): void {
    this.isLoading = this.store.select(getSpinnerStatus);
    this.store
      .select(getErrorMessage)
      .subscribe((message) => (this.errorMessage = message));
    this.store.dispatch(autoLoginAction());
  }
}
