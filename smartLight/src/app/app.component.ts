import { Component } from '@angular/core';
import { WelcomePage } from './pages/welcome/welcome.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  //template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class AppComponent {
  rootPage = WelcomePage;
  constructor() {}
}
