import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgZone } from '@angular/core'
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-colours',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  devices: any[] = [];
  isScanning: boolean = false;
  status: string = "";
  device: any;

  constructor(public router: Router, private ble: BLE, private toastControl: ToastController,
    private zone: NgZone,) { }

  ngOnInit() {
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

  deviceDiscovered(device: any) {
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

  selectLight(device: any) {
    this.device = device;
    if (this.isScanning) {
      this.stopScanning();
    }
    let navigationExtras: NavigationExtras = {
      state: {
        device: this.device
      }
    };
    this.router.navigate(['/home/controller'], navigationExtras);
  }

}
