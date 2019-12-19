import { Component, OnInit, Inject } from '@angular/core';
import { ServiceService } from '../service.service';
import { emailID } from '../shared/modal/emailID';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-id-crds',
  templateUrl: './view-id-crds.component.html',
  styleUrls: ['./view-id-crds.component.css']
})
export class ViewIdCrdsComponent implements OnInit {
  selectedId: any;
  public details = new emailID;

  constructor(private _APIService:ServiceService,public dialog: MatDialog,private router: Router) { }

  ngOnInit() {
    this.selectedId= this._APIService.selectedId;
  }
  onNoClick(){
   
    this.router.navigate(['/activity',this.selectedId]);
  }
  send(){
    this.details.username=sessionStorage.getItem('username');
    console.log(sessionStorage.getItem('username'));
    this._APIService.emailID(this.details).subscribe(
      (data:string)=>{
        console.log(data);
        const dialogRef = this.dialog.open(DialogOverview, {
          width: '400px',
          data: { data:data}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
        console.log(data);
      }
    );
  }
}
@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog.html',
  styleUrls: ['./view-id-crds.component.css']
})
export class DialogOverview {
 
  message: string;
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data:{data:string} ){
      this.message=data.data;
      console.log(this.data);
    }
    
  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data);
  }
}