import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, NavigationExtras } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { NgZone } from '@angular/core'
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  devices: any[] = [];
  isScanning: boolean = false;
  status: string = "";

  constructor(public angularFire: AngularFireAuth, public router: Router, 
    private zone: NgZone, private authService: FirebaseAuthService, 
    private ble: BLE, private toastControl: ToastController) 
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
 

  startScanning() {
    this.devices = []; //empty the list
    this.isScanning = true;
    this.ble.scan([], 15).subscribe(
      device => this.deviceDiscovered(device),
      error => this.scanError(error)
    );
    setTimeout(this.setStatus.bind(this), 5000, "Scan complete");
  }

  async scanError(error) {
    let toast = await this.toastControl.create({
      message: "Error scanning for devices",
      position: "middle",
      duration: 5000
    });
    toast.present();
  }

  deviceDiscovered(device) {
    console.log("Device: " + JSON.stringify(device, null, 2));
    this.zone.run(() => {
      this.devices.push(device);
    });
  }

  setStatus(message) {
    console.log(message);
    this.zone.run(() => {
      this.status = message;
    })
  }

  stopScanning() {
    this.ble.stopScan().then(() => {
      this.zone.run(() => {
        this.isScanning = false;
      });
    });
  }

  selectLight(device) {
    if (this.isScanning) {
      this.stopScanning();
    }
    let navigationExtras: NavigationExtras = {
      state: {
        light: device
      }
    };
    this.router.navigate(['/home/controller', navigationExtras]);
  }


}
