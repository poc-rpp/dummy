import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { MAT_RADIO_GROUP_CONTROL_VALUE_ACCESSOR } from '@angular/material';

@Component({
  selector: 'app-benefit-summary',
  templateUrl: './benefit-summary.component.html',
  styleUrls: ['./benefit-summary.component.css']
})
export class BenefitSummaryComponent implements OnInit {
  //chart:any;
  canvas: any;
  ctx: any;
  @ViewChild('chart', {static: true}) chartElementRef: ElementRef;
public chartDatasets: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];

  // @ViewChild('canvas') canvas: ElementRef;
  // chart : Chart;
 xaxis=["afjlajl","fhkgsuk","jhsevfg"];
 data1:any="wcvhkw";
  public resJSON = {
    subscriber_address: '',
    max_oop_non_par_single: '',
    urgent_care_copay: '',
    specialist_copay: '', 
    max_deductible_non_par_family: '',
    max_deductible_par_single: '',
    patient_first: '',
    member_product_code: '',
    email: '', 
    max_deductible_non_par_single: '', 
    max_deductible_par_family: '', 
    max_oop_par_family: '', 
    patient_last: '', 
    subscriber_id: '', 
    max_oop_par_single: '', 
    password: '', 
    office_visit_copay: '', 
    group_number: '', patient_dob: '', 
    phone_number: '', 
    username: '', 
    member_product_code_desc: '', 
    routine_preventative_care: '', 
    max_oop_non_par_family: ''
  };
  constructor( private _APIService: ServiceService,private router: Router) { }
  back(){
    let selectedId = this._APIService.selectedId;
    this.router.navigate(['/activity',selectedId]);
  }
  ngOnInit() {
    this._APIService.benefits().subscribe(
      (data:Response)=>{
        console.log(JSON.parse(JSON.parse(JSON.stringify(data)).body).patient_first)
        var jsonRes = JSON.parse(JSON.parse(JSON.stringify(data)).body)
        console.log(jsonRes.patient_first)
        this.resJSON = jsonRes
      }
    );
  }
  
}
    // this.canvas = document.getElementById('myChart');
    // this.ctx = this.canvas.getContext('2d');
    // let myChart = new Chart(this.ctx, {
    //   type: 'bar',
    //   data: {
    //       labels: ["New", "In Progress", "On Hold"],
    //       datasets: [{
    //           label: '# of Votes',
    //           data: [1,2,3],
    //           backgroundColor: [
    //               'rgba(255, 99, 132, 1)',
    //               'rgba(54, 162, 235, 1)',
    //               'rgba(255, 206, 86, 1)'
    //           ],
    //           borderWidth: 1
    //       }]
    //   },
    //   options: {
    //     responsive: false,
        
    //   }
    // });

    // // let ctx = document.getElementById("myChart").get);
    // let context = this.chartElementRef.nativeElement;
    // this.chart = new Chart('chart',{
    //   type:'line',
    //   data:{
    //     labels: this.xaxis,
    //     datasets:[
    //       {
    //         data:[65, 59, 80, 81, 56, 55, 40],
    //         borderColor:'blue',
    //         fill:false,

    //       },
    //       {
    //         data:[65, 59, 80, 81, 56, 55, 40,85],
    //         borderColor:'blue',
    //         fill:false,

    //       }
    //     ]
    //   },
    //   options:{
    //     legend:{
    //       display:false
    //     },
    //     scales:{
    //       xAxes:[
    //         {
    //           display:true
    //         }
    //       ],
    //       yAxes:[
    //         {
    //           display:true
    //         }
    //       ]
    //     }
    //   }

    // })
    // // 
    
    

