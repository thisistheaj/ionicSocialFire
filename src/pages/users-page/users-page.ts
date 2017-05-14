import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsersService } from '../../providers/users-service';
import { UserService } from '../../providers/user-service';
import { FirebaseListObservable } from 'angularfire2/database'

/**
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-users-page',
  templateUrl: 'users-page.html',
})
export class UsersPage {

  public users: FirebaseListObservable<any[]>
  public currentuser: any;
  public user: any;
  public following: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public Users: UsersService, public User: UserService) {
    this.users = Users.getUsers();
    this.currentuser = User.getCurrentUser();
    this.user = User.getCurrentUserObject();
    this.following = User.getFollowing();
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  public setFollowing(u,val){
    var obj={};
    obj[u.uid] = val;
    this.following.update(obj);
  }

}
