import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login'])
    //this.navCtrl.navigateRoot('../login/login.page');
  }

  register() {
    this.router.navigate(['/registration'])
    //this.navCtrl.navigateRoot('./registration.page');
  }

}
