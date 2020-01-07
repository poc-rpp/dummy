import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {Router} from '@angular/router';
import { ClaimspopupComponent } from '../claimsubmission/claimspopup/claimspopup.component';
import { claimresults } from '../shared/modal/claimresults';
import { ServiceService } from '../service.service';
import { PaymentComponent } from './payment/payment.component';

@Component({
  selector: 'app-getpaid',
  templateUrl: './getpaid.component.html',
  styleUrls: ['./getpaid.component.css']
})
export class GetpaidComponent implements OnInit {
  public condition:boolean=true;
  public restsctn2:any;
  public results = new claimresults;

  constructor(public dialog: MatDialog, private router: Router,private _APIService:ServiceService) { 
    
    //console.log(JSON.parse(this.router.getCurrentNavigation().extras.state.data));
    // var input = JSON.parse(this.router.getCurrentNavigation().extras.state.data)
    // this.results.transaction_id = "1";
    // this.results.total_charge = input.total_billed_amt;
    // this.results.total_discount = input.discount_percentage;
    // this.results.total_allowed = input.total_allowed_amt;
    // this.results.total_paid = input.total_provider_pay_amt;
    // this.results.member_responsibility = input.total_member_responsibility;
    // this.results.discount_amount= input.services[0].discount_amt;
    // this.results.diagnosis_code= input.services[0].diagnosis_code_line;
    // this.results.cpt_hcpcs= input.services[0].procedure_code;
    // this.results.charge= input.services[0].billed_amount;
    // this.results.allowed= input.services[0].allowed_amt;
    // this.results.paid= input.services[0].provider_pay_amt;
    // this.results.service_member_responsibility= input.services[0].member_responsibility;
  }

  ngOnInit() {
    this.restsctn2= this._APIService.results;
  }

  submit(){
    this.condition=false;
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '900px',
      height:'auto',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Ok was clicked');

     
    });

  }
}
