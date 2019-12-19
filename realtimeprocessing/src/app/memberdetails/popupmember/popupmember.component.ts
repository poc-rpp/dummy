import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-popupmember',
  templateUrl: './popupmember.component.html',
  styleUrls: ['./popupmember.component.css']
})
export class PopupmemberComponent implements OnInit {

  public resJSON:any;
  ngOnInit() {
    this.resJSON=this._APIService.resJSON;
    console.log(this.resJSON.routine_preventative_care);
  }
  constructor(
    public dialogRef: MatDialogRef<PopupmemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private router: Router,private _APIService:ServiceService,
   ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  gotoSubmit(){
    this.router.navigate(['/userprofile']);
  }

}
