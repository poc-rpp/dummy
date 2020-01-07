import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AppInfoDialogComponent } from './app-info-dialog/app-info-dialog.component';
import { FormatsDialogComponent } from './formats-dialog/formats-dialog.component';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  @Output() valueQR = new EventEmitter<string>();
  ngOnInit() {

  }
  vote() {
    this.valueQR.emit(this.qrResultString);
  }
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;
  flag = true;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  constructor(private readonly _dialog: MatDialog) { }

  close() {
    this.currentDevice = null;
    this.flag = false;

  }
  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
    console.log(this.currentDevice);

  }



  onCodeResult(resultString: string) {
    // if (resultString!="" &&)
    this.qrResultString = resultString;
    this.currentDevice = null;
    this.flag = false;
    this.vote();
  }

  onDeviceSelectChange(selected: string) {

    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = this.availableDevices[1];
    this.currentDevice = device || null;
    this.flag = true;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };

    this._dialog
      .open(FormatsDialogComponent, { data })
      .afterClosed()
      .subscribe(x => { if (x) { this.formatsEnabled = x; } });
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

    this._dialog.open(AppInfoDialogComponent, { data });
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

}
