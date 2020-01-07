import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

export class reset{
  public username:string;
  public old_password: string;
  public password: string; 
  
}
export class forgot{
  public username:string;
  public email: string;
  public question: string;
  public answer: string;
}
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotdetails= new forgot;
  resetdetails = new reset;
  selectedId: any;
  done:boolean=false;
  constructor(private _route: ActivatedRoute,private _APIService:ServiceService,private spinnerService: Ng4LoadingSpinnerService ) { }

  ngOnInit() {
    let params: any = this._route.snapshot.params;
    this.selectedId=params.id;
  }
  reset(){
    this.done=true;
    this._APIService.reset(this.resetdetails).subscribe(
      (data:Response)=>{
        console.log("reseted")
      }
    );

  }
  verify(){
    this.spinnerService.show();
    this._APIService.forgot(this.forgotdetails).subscribe(
      (data:Response)=>{
        this.spinnerService.hide();
        this.done=true;
        console.log("done")
      }
    );
  }
}
