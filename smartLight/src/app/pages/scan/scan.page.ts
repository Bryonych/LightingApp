import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NgZone } from '@angular/core'
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { HomePage } from 'src/app/home/home.page';
import { BluetoothConnectionService } from 'src/app/services/bluetooth-connection.service';

@Component({
  selector: 'app-colours',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
/**
 * Represents the scanning page.
 */
export class ScanPage implements OnInit {
  devices: any[] = [];
  isScanning: boolean = false;
  status: string = "";
  device: any;
  @Output() deviceOutput = new EventEmitter<any>();

  constructor(public router: Router, private ble: BLE, private toastControl: ToastController,
    private zone: NgZone) { }

  ngOnInit() {
  }
  
  /**
   * Starts scanning for nearby devices. 
   */
  startScanning() {
    this.devices = []; //empty the list
    this.isScanning = true;
    this.ble.scan([], 15).subscribe(
      device => this.deviceDiscovered(device),
      error => this.scanError(error)
    );
    setTimeout(this.setStatus.bind(this), 5000, "Scan complete");
  }

  /**
   * Handles scanning errors.
   * @param error Error message.
   */
  async scanError(error) {
    let toast = await this.toastControl.create({
      message: "Error scanning for devices",
      position: "middle",
      duration: 5000
    });
    toast.present();
  }

  /**
   * Adds discovered devices to the array.
   * @param device Device discovered.
   */
  deviceDiscovered(device: any) {
    console.log("Device: " + JSON.stringify(device, null, 2));
    this.zone.run(() => {
      this.devices.push(device);
    });
  }

  /**
   * Handles the scanning status.
   * @param message Status message.
   */
  setStatus(message) {
    console.log(message);
    this.zone.run(() => {
      this.status = message;
    })
  }

  /**
   * Stops the scanning.
   */
  stopScanning() {
    this.ble.stopScan().then(() => {
      this.zone.run(() => {
        this.isScanning = false;
      });
    });
  }

  /**
   * Stores device seleted by user.
   * @param device Selected Device.
   */
  selectLight(device: any) {
    this.device = device;
    this.deviceOutput.emit(device);
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
