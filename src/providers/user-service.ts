import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database';

import * as firebase from 'firebase/app';

// declare var Parse: any;

/*
 Generated class for the UserService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserService {

  private authState: Observable<firebase.User>;
  private currentUser: firebase.User;
  private user: FirebaseObjectObservable<any>;
  private following: FirebaseObjectObservable<any>;

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
    this.authState = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      console.log('Auth State Changed. Current User:');
      console.log(user);
    });
  }

  public logInUser(pass, email): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, pass).then(user => {
      this.bindUserValues(user);
      return user;
    }).catch(error => {
      return firebase.Promise.reject(error);
    });
  }

  public signUpUser(pass, email): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass).then(user => {
      this.bindUserValues(user);
      return user;
    }).catch(error => {
      return firebase.Promise.reject(error);
    });
  }

  public signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut().then(data => {
      return data;
    }).catch(error => {
      return firebase.Promise.reject(error);
    });
  }

  public pushUser(email, uid): firebase.Promise<any> {
    return this.afDatabase.object('/users/' + this.currentUser.uid).update({
      email: email,
      uid: uid,
      following: ['']
    }).then(user => {
      return user;
    }).catch(error => {
      return firebase.Promise.reject(error);
    })
  }

  private bindUserValues(user) {
    this.currentUser = user;
    this.user = this.afDatabase.object('/users/' + this.currentUser.uid);
    this.following = this.afDatabase.object('/users/' + this.currentUser.uid + "/following");
  }

  public getCurrentUser() {
    return this.currentUser;
  }

  public getCurrentUserObject() {
    return this.user;
  }

  public getFollowing() {
    return this.following;
  }

}
