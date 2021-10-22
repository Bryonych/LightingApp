import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NgZone } from '@angular/core'
import { ToastController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.page.html',
  styleUrls: ['./controller.page.scss'],
})
export class ControllerPage implements OnInit {
  device: any;
  connecting: boolean = false;
  mode: 'rgb' | 'white' = 'rgb';
  //red = 128;
  //green = 0;
  //blue = 0;
  //warmWhite = 0;
  serviceId = 0xfe0f;
  characteristicId: string = "97fe6561-1001-4f62-86e9-b71ee2da3d22"; //Conectting

  powerSerivceId: string = "932c32bd-0000-47a2-835a-a8d455b859dd"
  powerCharacteristicId: string = "932c32bd-0007-47a2-835a-a8d455b859dd"; //01010005020400 turns it off 01010105020400 turn it on
                                                                      //0101010201 fe03027201 05020100 makes it bright white
                                                                      //0101010201 4c03027201 05020100 warm white
                                                                      //0101010201 980404faacf64c 05020100 red
                                                                      //0101010201 f10404ac55d66c 05020100 green
                                                                      //0101010201 df0404843f374f 05020100 blue
                                                                      
  on = '0x01010105020400';
  off = '0x01010005020400';
  bright = '0x0101010201fe0302720105020100';
  dim = '0x01010102014c0302720105020100';
  red = '0x0101010201980404faacf64c05020100';
  green = '0x0101010201f10404ac55d66c05020100';
  blue = '0x0101010201df0404843f374f05020100';

  constructor(private route: ActivatedRoute, private router: Router, private ble: BLE, private zone: NgZone) { 
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
    this.connect(this.device.id);
  }

  ionViewWillLeave() {
    this.ble.disconnect(this.device.id);
  }

  connect(deviceId: string) {
    this.ble.connect(deviceId).subscribe(
      () => {
        this.zone.run(() => {
          this.connecting = false;
          //this.readBulbState();
        });
      },
      error => {
        console.error('Error ', error);
      });
  }

  // private sendCommand(value: Uint8Array) {
  //   this.ble.writeWithoutResponse(this.device.id, this.serviceId.toString(16), 
  //   this.characteristicId, value.buffer);
  // }

  convertToArray(hex: string) : Uint8Array {
    let arr = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    return arr;
  }

  turnOn() {
    let arr = this.convertToArray(this.on);
    this.ble.writeWithoutResponse(this.device.id, this.powerSerivceId, this.powerCharacteristicId, arr.buffer);
  }

  turnOff() {
    let arr = this.convertToArray(this.off);
    this.ble.writeWithoutResponse(this.device.id, this.powerSerivceId, this.powerCharacteristicId, arr.buffer);
  }

  brighten() {
    let arr = this.convertToArray(this.bright);
    this.ble.writeWithoutResponse(this.device.id, this.powerSerivceId, this.powerCharacteristicId, arr.buffer);
  }

  makeDim() {
    let arr = this.convertToArray(this.dim);
    this.ble.writeWithoutResponse(this.device.id, this.powerSerivceId, this.powerCharacteristicId, arr.buffer);
  }

  turnRed() {
    let arr = this.convertToArray(this.red);
    this.ble.writeWithoutResponse(this.device.id, this.powerSerivceId, this.powerCharacteristicId, arr.buffer);
  }

  turnGreen() {
    let arr = this.convertToArray(this.green);
    this.ble.writeWithoutResponse(this.device.id, this.powerSerivceId, this.powerCharacteristicId, arr.buffer);
  }

  turnBlue() {
    let arr = this.convertToArray(this.blue);
    this.ble.writeWithoutResponse(this.device.id, this.powerSerivceId, this.powerCharacteristicId, arr.buffer);
  }

  // private onBulbStateReceived(data: Uint8Array) {
  //   if (data[0] === 0x66) {
  //     this.red = data[6];
  //     this.green = data[7];
  //     this.blue = data[8];
  //     this.warmWhite = data[9];
  //     this.mode = (data[3] === 0x4b) ? 'white' : 'rgb';
  //   }
  // }

  // readBulbState() {
  //   this.ble.startNotification(this.device.id, this.notificationServiceId, this.notificationCharacteristicId)
  //     .subscribe(buffer => this.zone.run(() => this.onBulbStateReceived(new Uint8Array(buffer))));
  //   //this.sendCommand(new Uint8Array(this.readBulbStateCommand));
  // }

  // updateColor() {
  //   this.sendCommand(this.getColorValue(this.red, this.green, this.blue));
  // }

  // updateWhite() {
  //   this.sendCommand(this.getWhiteValue(this.warmWhite));
  // }

  // getColorValue(red: number, green: number, blue: number) {
  //   return new Uint8Array([0x56, red, green, blue, 0, 0xf0, 0xaa]);
  // }

  // getWhiteValue(warmWhite: number) {
  //   return new Uint8Array([0x56, 0, 0, 0, warmWhite, 0x0f, 0xaa])
  // }

}
