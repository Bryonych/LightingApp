import { Component, OnInit } from '@angular/core';
import { ScanPage } from '../scan/scan.page';
import { BluetoothConnectionService } from '../../services/bluetooth-connection.service';

@Component({
  selector: 'app-proximity',
  templateUrl: './proximity.page.html',
  styleUrls: ['./proximity.page.scss'],
})
/**
 * Represents the proximity page.
 */
export class ProximityPage implements OnInit {
  yesConnect: boolean = false;
  deviceId: string = "D9:E9:71:8C:77:BE";

  constructor(private btService: BluetoothConnectionService) {}

  ngOnInit() {
  }

  autoConnect() {
    this.btService.autoConnect(this.deviceId);
  }

  disconnect() {
    this.btService.turnOff(this.deviceId);
    this.btService.disconnect(this.deviceId);
  }

 

}
