import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setSpinnerStatus } from 'src/app/components/loading-spinner/store/spinner.action';
import { AppState } from 'src/app/store/app.state';
import { signupAction } from '../store/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSignup() {
    this.store.dispatch(setSpinnerStatus({ status: true }));
    this.store.dispatch(
      signupAction({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
      })
    );
    this.signupForm.reset();
  }
}
