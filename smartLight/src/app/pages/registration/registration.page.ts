import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
/**
 * Represents the registration page.
 */
export class RegistrationPage implements OnInit {
  name: string = "";
  email: string = "";
  password: string = "";
  displayError = "";

  constructor(public angularFire: AngularFireAuth, public router: Router, private authService: FirebaseAuthService) {

   }

  ngOnInit() {
  }

  redirectUser() {
    this.router.navigate(['/home']);
  }

  signup(){
    this.authService.signUpWithEmail(this.email, this.password)
    .then(user => {
      this.redirectUser();
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        this.displayError = "That email is already in use";
      }
      else if (error.code === 'auth/invalid-email') {
        this.displayError = "That email address is invalid";
      }
      else {
        this.displayError = error.message;
      }
    });
  }

  moveToLogin() {
    this.router.navigate(['/index/login']);
  }

}
