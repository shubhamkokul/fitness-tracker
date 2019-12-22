import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {SignupComponent} from './components/auth/signup/signup.component';
import {LoginComponent} from './components/auth/login/login.component';
import {CurrentTrainingComponent} from './components/training/current-training/current-training.component';
import {NewTrainingComponent} from './components/training/new-training/new-training.component';
import {PastTrainingComponent} from './components/training/past-training/past-training.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TrainingComponent} from './components/training/training.component';
import {HeaderComponent} from './components/navigation/header/header.component';
import {SidenavListComponent} from './components/navigation/sidenav-list/sidenav-list.component';
import {CurrentTrainingDialogComponent} from './components/training/current-training-dialog/current-training-dialog.component';
import {AuthService} from './components/auth/auth.service';
import {TrainingService} from './components/training/training.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {UIService} from './shared/u-i.service';
import {StoreModule} from '@ngrx/store';
import {appReducer} from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    TrainingComponent,
    HeaderComponent,
    SidenavListComponent,
    CurrentTrainingDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot({ui: appReducer})
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [CurrentTrainingDialogComponent]
})
export class AppModule {
}
