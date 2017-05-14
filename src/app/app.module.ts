import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users-page/users-page';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UsersService } from '../providers/users-service';
import { UserService } from '../providers/user-service';

export const config = {
  apiKey: "AIzaSyDIX9h1XPh3A84v_OrT35R4vANTTLj-zQg",
  authDomain: "followers-e0e8d.firebaseapp.com",
  databaseURL: "https://followers-e0e8d.firebaseio.com",
  projectId: "followers-e0e8d",
  storageBucket: "followers-e0e8d.appspot.com",
  messagingSenderId: "758989306245"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UsersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    UsersService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
