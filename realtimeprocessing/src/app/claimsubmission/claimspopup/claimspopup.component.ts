import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PopupmemberComponent, DialogData } from '../../memberdetails/popupmember/popupmember.component';

@Component({
  selector: 'app-claimspopup',
  templateUrl: './claimspopup.component.html',
  styleUrls: ['./claimspopup.component.css']
})
export class ClaimspopupComponent implements OnInit {


  ngOnInit() {
  }
  constructor(
    public dialogRef: MatDialogRef<PopupmemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
