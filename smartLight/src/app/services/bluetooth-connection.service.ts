import { NgZone } from '@angular/core'
import { BLE } from '@ionic-native/ble/ngx';
import { Injectable } from '@angular/core';

/**
 * Sends commands via bluetooth to the device.
 */
@Injectable()
export class BluetoothConnectionService {
    autoCon: boolean = false;
    serviceId = 0xfe0f;
    characteristicId: string = "97fe6561-1001-4f62-86e9-b71ee2da3d22"; 

    // UUIDs for the controls
    powerSerivceId: string = "932c32bd-0000-47a2-835a-a8d455b859dd"
    powerCharacteristicId: string = "932c32bd-0007-47a2-835a-a8d455b859dd"; 
                                                                        
    // Command byte arrays
    on = '0x01010105020400';
    off = '0x01010005020400';
    bright = '0x0101010201fe0302720105020100';
    dim = '0x01010102014c0302720105020100';
    red = '0x0101010201980404faacf64c05020100';
    green = '0x0101010201f10404ac55d66c05020100';
    blue = '0x0101010201df0404843f374f05020100';

    constructor(private ble: BLE, private zone: NgZone) { 
    }

    /**
     * Connects to the device.
     * @param deviceId ID of the device to connect to.
     */
    connect(deviceId: string) {
        this.ble.connect(deviceId).subscribe(
        () => {
            this.zone.run(() => {
        });
        },
        error => {
            console.error('Error ', error);
        });
    
    }

    /**
     * Connects when in Range.
     * @param deviceId  The ID of the device to connect to.
     */
    autoConnect(deviceId: string) {
        this.ble.autoConnect(deviceId, this.onConnected(deviceId), this.onDisconnected);
        this.autoCon = true;
    }

    /**
     * Connect Callback.
     * @param deviceId The ID of the device to connect to.
     */
    onConnected(deviceId: string){
        console.log("Connected");
        this.turnOn(deviceId);
    }

    /**
     * Disconnect Callback.
     */
    onDisconnected(){
        console.log("Disconnected");
    }

    /**
     * Dicsonnects from autoconnect.
     * @param deviceId  The ID of the device to connect to.
     */
    disconnect(deviceId: string) {
        this.ble.disconnect(deviceId);
    }

    /**
     * Converts the byte array string command to an array.
     * @param hex   The string to be converted.
     * @returns     The byte array.
     */
    convertToArray(hex: string) : Uint8Array {
        let arr = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
            return parseInt(h, 16)
        }))
        return arr;
    }

    /**
     * Sends a command via bluetooth to the device.
     * @param arr       The command byte array.
     * @param deviceId  The ID of the device to connect to.
     */
    sendCommand(arr: Uint8Array, deviceId: string){
        this.ble.writeWithoutResponse(deviceId, this.powerSerivceId, this.powerCharacteristicId, arr.buffer);
    }

    /**
     * Turns the device on.
     * @param deviceId  The ID of the device to connect to.
     */
    turnOn(deviceId: string) {
        let arr = this.convertToArray(this.on);
        this.sendCommand(arr, deviceId);
    }

    /**
     * Turns the device off.
     * @param deviceId The ID of the device to connect to.
     */
    turnOff(deviceId: string) {
        let arr = this.convertToArray(this.off);
        this.sendCommand(arr, deviceId);
    }

    /**
     * Increases the brightness.
     * @param deviceId The ID of the device to connect to.
     */
    brighten(deviceId: string) {
        let arr = this.convertToArray(this.bright);
        this.sendCommand(arr, deviceId);
    }

    /**
     * Decreases the brightness.
     * @param deviceId The ID of the device to connect to.
     */
    makeDim(deviceId: string) {
        let arr = this.convertToArray(this.dim);
        this.sendCommand(arr, deviceId);
    }

    /**
     * Changes lights to red.
     * @param deviceId The ID of the device to connect to.
     */
    turnRed(deviceId: string) {
        let arr = this.convertToArray(this.red);
        this.sendCommand(arr, deviceId);
    }

     /**
     * Changes lights to green.
     * @param deviceId The ID of the device to connect to.
     */
    turnGreen(deviceId: string) {
        let arr = this.convertToArray(this.green);
        this.sendCommand(arr, deviceId);
    }

     /**
     * Changes lights to blue.
     * @param deviceId The ID of the device to connect to.
     */
    turnBlue(deviceId: string) {
        let arr = this.convertToArray(this.blue);
        this.sendCommand(arr, deviceId);
    }
}