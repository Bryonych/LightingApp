import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colours',
  templateUrl: './colours.page.html',
  styleUrls: ['./colours.page.scss'],
})
export class ColoursPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
