import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {UsersPage} from '../users-page/users-page';
import {UserService} from '../../providers/user-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user: any;

  constructor(public navCtrl: NavController, public User: UserService) {
    this.user = {
      email: "",
      password: ""
    };
  }

  public logInUser() {
    this.User.logInUser(this.user.password, this.user.email).then(user => {
      this.goToUsersPage();
    }).catch(error => {
      alert(error.message);
    });
  }

  public signUpUser() {
    this.User.signUpUser(this.user.password, this.user.email).then(user => {
      this.goToUsersPage();
    }).catch(error => {
      alert(error.message);
    });
  }

  private goToUsersPage() {
    this.navCtrl.push(UsersPage);
  }

}

