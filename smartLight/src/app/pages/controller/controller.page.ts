import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NgZone } from '@angular/core'
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { BluetoothConnectionService } from '../../services/bluetooth-connection.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
/**
 * Represents the controller page.
 */
export class ControllerPage implements OnInit {
  device: any;
  connecting: boolean = false;
  btConnector: BluetoothConnectionService

  constructor(private route: ActivatedRoute, private router: Router, private btService: BluetoothConnectionService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.device = this.router.getCurrentNavigation().extras.state.device;
      }
    });   
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.connecting = true;
    this.btService.connect(this.device.id);
    this.connecting = false;

  }

  /**
   * Navigates to scanning page to reconnect.
   */
  reconnect() {
    this.connecting = false;
    this.router.navigate(['/home/scan']);
  }

  /**
   * Turns on the lights.
   */
  turnOn() {
    this.btService.turnOn(this.device.id);
  }

  /**
   * Turns off the lights.
   */
  turnOff() {
    this.btService.turnOff(this.device.id);
  }

  /**
   * Increases the brightness.
   */
  brighten() {
    this.btService.brighten(this.device.id);
  }

  /**
   * Decreases the brightness.
   */
  makeDim() {
    this.btService.makeDim(this.device.id);
  }

  /**
   * Turns the lights red.
   */
  turnRed() {
    this.btService.turnRed(this.device.id);
  }

  /**
   * Turns the lights green.
   */
  turnGreen() {
    this.btService.turnGreen(this.device.id);
  }

  /**
   * Turns the lights blue.
   */
  turnBlue() {
    this.btService.turnBlue(this.device.id);
  }

}
