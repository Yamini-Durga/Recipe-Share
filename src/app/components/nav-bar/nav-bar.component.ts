import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { logoutAction } from 'src/app/auth/store/auth.action';
import { isAuthenticated } from 'src/app/auth/store/auth.selector';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  title = 'Recipe Share';
  isAuthenticated: Observable<boolean>;
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  onLogout() {
    this.store.dispatch(logoutAction());
  }
}
