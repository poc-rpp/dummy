import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-new-payments',
  templateUrl: './new-payments.component.html',
  styleUrls: ['./new-payments.component.css']
})
export class NewPaymentsComponent implements OnInit {
  JSON: any;
  resJSON: any;
  expand:boolean=false;
  constructor( private _APIService:ServiceService) { }
  memberId;
  data = [
    { id: 973, name: 'Mr. Nice', paymentDate: '26/12/1223',payment:'$100',amt:'$200',expand:false},
    { id: 974, name: 'Mr. Bad', paymentDate: '26/11/2008',payment:'$500',amt:'$900',expand:false },
    
  ];
  ngOnInit() {
    let id="123456789";
    this._APIService.getBenefitDetails(id).subscribe(
      (data) => {
        console.log("new payment called");
        console.log(data);
        this.resJSON = JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(data)).body)));
        this.JSON=JSON.parse(JSON.parse(JSON.stringify(data)).body).Items;
       
        console.log(this.JSON);
      },
      (error) => {
        console.log("hii from newpayment2 error");
      }
    );
  }
  expansion(patient){
    if(patient.status=='active')
    patient.status='notactive';
    else if (patient.status=='notactive')
    patient.status='active';
  }
 
}
