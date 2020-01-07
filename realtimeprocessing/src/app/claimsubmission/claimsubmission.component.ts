import { Component, OnInit, ViewChildren, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ServiceService } from '../service.service';
import { ClaimspopupComponent } from './claimspopup/claimspopup.component';
import {Router} from '@angular/router';
import { providerdetails } from '../shared/modal/providerdetails';
import { MemberdetailsComponent } from '../memberdetails/memberdetails.component';
import { services } from '../shared/modal/services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-claimsubmission',
  templateUrl: './claimsubmission.component.html',
  styleUrls: ['./claimsubmission.component.css']
})
export class ClaimsubmissionComponent implements OnInit {
  @Input() patient_data: Array<string>;
  codeGenerated: string;
  selectedId: any;
  number:number=1;
  blocks : any[];
  serviceSummary=false;
  condition= true;
  @ViewChild('scrollBottom',{static:true}) private scrollBottom: ElementRef;
  public patientfirstname:string;
  public patientlastname:string;
   public services: services[]=[ {
    "diagnosis_code_line": "",
    "service_from_date": "",
    "service_through_date": "",
    "place_of_service": "",
    "procedure_code": "",
    "billed_amount": 0,
    "number_of_units": 1
  }];
  // {
  //   "diagnosis_code_line": "asd2",
  //   "service_from_date": "1980-01-03",
  //   "service_through_date": "1980-01-04",
  //   "place_of_service": "Hereasd",
  //   "procedure_code": "asdkjasasdasd",
  //   "billed_amount": "552",
  //   "number_of_units": 22
  // }];
  constructor(private _APIService:ServiceService,public dialog: MatDialog, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { 
    this.blocks=[this.number];
    this.details.first=this._APIService.patientfirstname;
    this.details.last=this._APIService.patientlastname;
    // this.services = new Array<services>();
    // this.services[0].billed_amount="55";
    // this.services[0].diagnosis_code_line="Z0000";
    // this.services[0].number_of_units=2;
    // this.services[0].procedure_code="G0438";
    // this.services[0].service_from_date="1980-01-01";
    // this.services[0].service_through_date="1980-01-02";
    // this.services[0].place_of_service="G0438";
    // this.services[1].billed_amount="552";
    // this.services[1].diagnosis_code_line="asd2";
    // this.services[1].number_of_units=22;
    // this.services[1].procedure_code="asdkjasasdasd";
    // this.services[1].service_from_date="1980-01-03";
    // this.services[1].service_through_date="1980-01-04";
    // this.services[1].place_of_service="Hereasd";
  }
  
  public details = new providerdetails;
  procedureCodeList: string[]=["G0438",
  "P3000",
  "G0102",
  "G0104",
  "77067",
  "G0120",
  "V5008",
  "H0049",
  "S0610",
  "S0612",
  "Q2034",
  "90632",
  "90636",
  "90723",
  "G0402",
  "99381",
  "99213"
  ];
  ngOnInit() {
    this.selectedId= this._APIService.selectedId;
    console.log(this._APIService.selectedId);
    this.patientfirstname=this._APIService.patientfirstname;
    this.patientlastname=this._APIService.patientlastname;
    this.details.first=this._APIService.patientfirstname;
    this.details.last=this._APIService.patientlastname;
    this.details.subscriber_id=this._APIService.selectedId;
    
  }

  getProviderDetails(){
    
    this.spinnerService.show();
    this.details.services=this.services;
    this.details.first=this._APIService.patientfirstname;
    this.details.last=this._APIService.patientlastname;
    this.details.subscriber_id=this._APIService.selectedId;
    this._APIService.getProvider(this.details).subscribe(
      (data:Response)=>{
        console.log(data);
        this._APIService.results = JSON.parse(JSON.parse(JSON.stringify(data)));
        this.spinnerService.hide();
        // this.condition=false;
        this.serviceSummary=true;
        // document.getElementById('scrollBottom').scrollTop = 100;
        // this.router.navigate(['/getpaid'], {state: {data}});
      }
    );
    // var inputs = document.getElementsByTagName('input');

    // var services = []

    // for(var num_services = 0 ; num_services < ((inputs.length - 6) / 7); num_services++) {
    //   var current_offset = num_services * 7 + 6
    //   services[num_services] = {
    //       diagnosis_code_line: inputs[current_offset + 4].value,
    //       service_from_date: inputs[current_offset + 0].value,
    //       service_through_date: inputs[current_offset + 1].value,
    //       place_of_service: inputs[current_offset + 2].value,
    //       procedure_code: inputs[current_offset + 3].value,
    //       billed_amount: inputs[current_offset + 6].value,
    //       number_of_units: inputs[current_offset + 5].value,
    //   }
    // }
    // this.details.services = services
    
   
  }
  randomString() {
   
    
    return 0;
   }
  back(){
    this.router.navigate(['/activity',this.selectedId]);
  }
  addService(){
      this.services.push( {
        "diagnosis_code_line": "",
        "service_from_date": "",
        "service_through_date": "",
        "place_of_service": "",
        "procedure_code": "",
        "billed_amount": 0,
        "number_of_units": 1
      });
  }
  scrollToBottom(): void {
    try {
        this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch(err) { }
}
}
