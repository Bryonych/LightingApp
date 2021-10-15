import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { NgZone } from '@angular/core'
import { Platform } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  lights = [];
  isScanning: boolean = false;
  private android: boolean;

  constructor(public angularFire: AngularFireAuth, public router: Router, 
    private zone: NgZone, private authService: FirebaseAuthService, 
    private ble: BLE, platform: Platform) 
  { this.android = platform.is('android');}

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

  private enableBLE() {
    if (this.android) {
      return this.ble.enable();
    }
    else {
      return Promise.resolve();
    }
  }

  startScanning() {
    this.lights.length = 0;
    this.isScanning = true;
    this.enableBLE().then(() => {
      this.ble.startScan([]).subscribe(light => {
        this.zone.run(() => {
          this.lights.push(light);
        });
      });
    }).catch(error => {
      console.log("Couldn't enable BLE ", error);
      this.isScanning = false;
    });
  }

  stopScanning() {
    this.ble.stopScan().then(() => {
      this.zone.run(() => {
        this.isScanning = false;
      });
    });
  }

  selectLight(light) {
    if (this.isScanning) {
      this.stopScanning();
    }
    this.router.navigate(['/home/controller']);
  }


}
