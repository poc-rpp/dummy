import { Component, OnInit, Inject } from '@angular/core';
import { memberprofile } from '../shared/modal/memberprofile';
import { ServiceService } from '../service.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-memberprofile',
  templateUrl: './memberprofile.component.html',
  styleUrls: ['./memberprofile.component.css']
})
export class MemberprofileComponent implements OnInit {
  selectedId: any;
  JSON: any;
  public details = new memberprofile;
  constructor(private _APIService:ServiceService,public dialog: MatDialog,
    private router: Router,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.selectedId= this._APIService.selectedId;
    this.details.username = sessionStorage.getItem('username')
    this._APIService.populateProfile(this.details).subscribe(
      (data)=>{
        console.log(data);
        this.JSON=JSON.parse(JSON.parse(JSON.stringify(data)).body);
        console.log(this.JSON.emp_grp);
        this.details = this.JSON;
        console.log(this.details)
      });
  
}
update(){
  this.spinnerService.show();
  this._APIService.profileUpdate(this.details).subscribe(
    (data:Response)=>{
      console.log(data);
      this.spinnerService.hide();
      const dialogRef = this.dialog.open(DialogOverview1, {
        width: '250px',
        data: { data:data}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    });
}
back(){
  this.router.navigate(['/activity',this.selectedId]);
}
}
@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog.html',
  styleUrls: ['./memberprofile.component.css']
})
export class DialogOverview1 {
 
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverview1>,
    @Inject(MAT_DIALOG_DATA) public data:{data:string} ){
      this.message=data.data;
      console.log(this.data);
    }
    
  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data);
  }
}
