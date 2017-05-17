import { Injectable } from '@angular/core';


import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

// declare var Parse: any;

/*
 Generated class for the UsersService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UsersService {

  users: FirebaseListObservable<any[]>;

  constructor(public afDatabase: AngularFireDatabase) {
    this.users = afDatabase.list('/users');
    this.users.subscribe(function (data) {
      console.log(data)
    });
  }

  public getUsers(){
    return this.users;
  }

}
