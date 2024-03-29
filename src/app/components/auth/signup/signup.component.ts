import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UIService} from '../../../shared/u-i.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date;
  isLoading$: Observable<boolean>;
  diameter = 25;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<{ ui: fromApp.State }>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });

  }

}
