import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { UsersService } from '../../providers/users-service';
import { UserService } from '../../providers/user-service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database'

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

  public users: FirebaseListObservable<any[]>;
  public user: FirebaseObjectObservable<any>;
  public following: any;

  constructor(public usersService: UsersService, public userService: UserService) {
    this.users = usersService.getUsers();
    this.user = userService.getCurrentUser();
    this.following = userService.getFollowing();
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
