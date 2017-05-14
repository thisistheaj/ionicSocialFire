import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UsersPage} from '../users-page/users-page';
import {UserService} from '../../providers/user-service';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;
  private currentUser: firebase.User;

  constructor(public navCtrl: NavController, public User: UserService, public afAuth: AngularFireAuth, public af: AngularFireModule) {
    this.user = {
      email: "",
      password: ""
    };
  }

  public logInUser() {
    this.User.logInUser(this.user.password, this.user.email).then(user => {
      this.currentUser = user;
      this.goToUsersPage();
    }).catch(error => {
      alert(error);
    });
  }

  public signUpUser() {
    this.User.signUpUser(this.user.password, this.user.email).then(user => {
      this.currentUser = user;
      this.pushUser();
      this.goToUsersPage();
    }).catch(error => {
      alert(error);
    });
  }

  private goToUsersPage() {
    this.navCtrl.push(UsersPage);
  }

  private pushUser() {
    this.User.pushUser(this.user.email, this.currentUser.uid);
  }

}

