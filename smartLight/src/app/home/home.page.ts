import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public angularFire: AngularFireAuth, public router: Router, 
     private authService: FirebaseAuthService) 
  { }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut()
    .subscribe(() => {
      this.router.navigate(['/index']);
    }, (error) => {
      console.log("Signout error ", error);
    });
  }

 
}
