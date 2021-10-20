import { FirebaseAuthService } from '../services/firebase-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router,  ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
 
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/index']);
          resolve(false);
        }
      });
    });
  }
}