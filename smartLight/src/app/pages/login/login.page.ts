import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
/**
 * Represents the login page.
 */
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  displayError = "";

  constructor(public angularFire: AngularFireAuth, public router: Router, private authService: FirebaseAuthService) 
  { }

  ngOnInit() {
  }

  redirectUser() {
    this.router.navigate(['/home']);
  }

  login(){
    this.authService.signInWithEmail(this.email, this.password)
    .then(user => {
      this.redirectUser();
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        this.displayError = "No such user";
      }
      else if (error.code === 'auth/wrong-password') {
        this.displayError = "Invalid email/password combination";
      }
      else if (error.code === 'auth/invalid-email') {
        this.displayError = "Invalid email address";
      }
      else {
        this.displayError = error.message;
      }
    });
  }

}
