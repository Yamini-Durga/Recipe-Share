import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setSpinnerStatus } from 'src/app/components/loading-spinner/store/spinner.action';
import { AppState } from 'src/app/store/app.state';
import { loginAction } from '../store/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  onLogin() {
    this.store.dispatch(setSpinnerStatus({ status: true }));
    this.store.dispatch(
      loginAction({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
    );
    this.loginForm.reset();
  }
}
