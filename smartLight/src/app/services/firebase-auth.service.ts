
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, from } from 'rxjs';

@Injectable()
export class FirebaseAuthService {
    currentUser: firebase.User;

    constructor(public angularFireAuth: AngularFireAuth) {
        this.angularFireAuth.onAuthStateChanged((user) => {
            if (user) {
                this.currentUser = user;
            } 
            else {
                this.currentUser = null;
            }
        });
    }

    signInWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    }
      
    signUpWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    }

    signOut(): Observable<any> {
        return from(this.angularFireAuth.signOut());
    }


}