import {Injectable} from '@angular/core';

import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';

import * as firebase from 'firebase/app';

// declare var Parse: any;

/*
 Generated class for the UserService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserService {

  private user: FirebaseObjectObservable<any>;
  private following: FirebaseObjectObservable<any>;

  constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {
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
      this.pushUser(email,user.uid);
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

  private pushUser(email, uid): firebase.Promise<any> {
    return this.afDatabase.object('/users/' + uid).update({
      email: email,
      uid: uid,
      following: ['']
    }).then(user => {
      return user;
    }).catch(error => {
      return firebase.Promise.reject(error);
    });
  }

  public getFollowing() {
    return this.following;
  }

  private bindUserValues(user) {
    this.user = this.afDatabase.object('/users/' + user.uid);
    this.following = this.afDatabase.object('/users/' + user.uid + "/following");
  }

  public getCurrentUser() {
    return this.user;
  }

}
