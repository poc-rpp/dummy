import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';
import * as Chart from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PopupmemberComponent } from '../memberdetails/popupmember/popupmember.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Output() voted = new EventEmitter<string>();
  ctx: any;
  canvas: any;
  JSON: any;
  reJSON:any;
  timer:any;
  benefitResJSON:any;
  today = this.getDateString();
  data:any;
  contextMenuPosition = { x: '0px', y: '0px' };
  constructor( private _APIService: ServiceService,private _route: ActivatedRoute, public dialog: MatDialog, private spinnerService: Ng4LoadingSpinnerService) { }
  @ViewChild('chart', {static: true}) chartElementRef: ElementRef;

  @ViewChild(MatMenuTrigger, {static: true})
  contextMenu: MatMenuTrigger;

  ngOnInit() {
    this._APIService.getDataDashboard().subscribe(
      (data)=>{
        console.log(data);
        this.JSON=JSON.parse(JSON.parse(JSON.stringify(data)).body).latest_member_scans;
        this.reJSON=JSON.parse(JSON.parse(JSON.stringify(data)).body);
        
        this.canvas = document.getElementById('chart') ;
        this.ctx = this.canvas.getContext('2d');
        let myChart = new Chart(this.ctx, {
          type: 'pie',
          data: {
              labels: ["No: Of Patient's Visited today", "No: Of successful payments" , "No.of Payments made today"],
              datasets: [{
                  label: '# of payments',
                  data: [this.reJSON.num_qrs_scanned,this.reJSON.num_successful_payments,4],
                  backgroundColor: [
                      'rgb(0, 102, 178)',
                      'green',
                      'red'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
            animation: {
              duration: 0
            }
          }
        });
      }
    ) ;
   this.load();
  }
  load(){
    // let params: any = this._route.snapshot.params;
    // this.timer = setTimeout(() => {
    //   this.ngOnInit();
    //  },5000)
  }
  onRightClick(event:MouseEvent, patient) {
    console.log(patient)
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': patient };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

 

  getBenefits(patient) {
    clearTimeout(this.timer);
    console.log(patient);
    this.spinnerService.show();
    let details = {
      first:patient.firstname,
      last:patient.lastname,
      dob:patient.dob,
      id:patient.member_id
    }
    this._APIService.getValidation(details).subscribe(
      (data)=>{
        console.log(data)
        this.benefitResJSON=JSON.parse(JSON.parse(JSON.stringify(data)).body);
        this._APIService.resJSON = JSON.parse(JSON.parse(JSON.stringify(data)).body);
        console.log(this.benefitResJSON);
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(PopupmemberComponent, {
          width: 'auto',
          height:'auto',
          data: {},
          autoFocus: false,
        });
        dialogRef.afterOpen().subscribe(result => {
          document.getElementById('popup_dialog').scrollTop = 0;
        })
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
         
        });
        this.load();
      },
      (error)=>{this.spinnerService.hide();}
    );
  }

  getPayments(patient) {
    // let data: Array<string> = [patient.firstname, patient.lastname, '4'];
    // console.log(data);
    // this.voted.emit(data);
    this._APIService.patientfirstname=patient.firstname;
    this._APIService.patientlastname=patient.lastname;
    this.voted.emit("4");
   // alert(`Click on Payments for ${patient.member_id}`);
  }

  submitService(patient) {
    console.log(patient)
    this._APIService.patientfirstname=patient.firstname;
    this._APIService.patientlastname=patient.lastname;
    this.voted.emit("2");
    console.log(`Click on submit service for ${patient.member_id}`);
  }

  getDateString() {
    var datetime = new Date();
    var dateString = '';
    if(datetime.getDay() == 0) {
      dateString = 'Sunday';
    } else if(datetime.getDay() == 1) {
      dateString = 'Monday';
    } else if(datetime.getDay() == 2) {
      dateString = 'Tuesday';
    } else if(datetime.getDay() == 3) {
      dateString = 'Wednesday';
    } else if(datetime.getDay() == 4) {
      dateString = 'Thursday';
    } else if(datetime.getDay() == 5) {
      dateString = 'Friday';
    } else {
      dateString = 'Saturday';
    }
    dateString = dateString + ', ' + datetime.toISOString().slice(0,10);
    return dateString;
  }

  ngAfterViewInit() {
   
  }
}
