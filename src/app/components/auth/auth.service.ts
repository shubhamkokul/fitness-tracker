import {Injectable} from '@angular/core';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {MatSnackBar} from '@angular/material';
import {UIService} from '../../shared/u-i.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private authentication: AngularFireAuth,
              private trainingService: TrainingService,
              private snackBar: MatSnackBar,
              private uiService: UIService,
              private store: Store<{ ui: fromApp.State }>) {
  }

  initAuthListener() {
    this.authentication.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigateByUrl('/training');
      } else {
        this.trainingService.unsubscribeTrainingSub();
        this.authChange.next(false);
        this.router.navigateByUrl('/login');
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch({type: 'START_LOADING'});
    this.authentication.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch({type: 'STOP_LOADING'});
      })
      .catch(err => {
        this.uiService.loadingStateChanged.next(true);
        this.uiService.showSnackBar(err.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.authentication.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch({type: 'STOP_LOADING'});
        // this.uiService.loadingStateChanged.next(false);
      })
      .catch(err => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackBar(err.message, null, 3000);
      });
  }

  logout() {
    this.authentication.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
