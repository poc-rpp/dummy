import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { MatDialog } from '@angular/material';
import { memberdetails } from '../shared/modal/memberdetails';
import { PopupmemberComponent } from '../memberdetails/popupmember/popupmember.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare const qrcode: any;
@Component({
  selector: 'app-provider-activity',
  templateUrl: './provider-activity.component.html',
  styleUrls: ['./provider-activity.component.css'],
 
})
export class ProviderActivityComponent implements OnInit {

  resJSON: any;
  isScanned: boolean=false;
  interval;
  public details = new memberdetails;
  @ViewChild("video",{static:true})
  public video: ElementRef;
  
  @ViewChild("canvas",{static:false})
  public canvas: ElementRef;
  data: Date= new Date;
  public captures: Array<any> = [];
  elementType = 'url';  
  public imagePath;  
  value : any;  
  @ViewChild('result',{static:true}) resultElement: ElementRef;  
  showQRCode; 
  selectedIndex;
  patient_data:Array<string>;
  ngOnInit() {

  }
  chnageTb(){
    this.selectedIndex = 0;
    console.log("yoyoyo");
  }
  constructor(private _route: ActivatedRoute,private _APIService:ServiceService,public dialog: MatDialog,
     private spinnerService: Ng4LoadingSpinnerService,private renderer: Renderer2) {
    this.captures = [];
   }
  tabClick(tab) {
    console.log(tab);
    this.selectedIndex=tab.index;
    this.showQRCode= tab.index;
    if(this.showQRCode===1){
      this.capture('notscan');
      setTimeout(() => {
        this.capture('scan');
      }, 3000);
    }
    else
    if(this.video.nativeElement.srcObject!=null){
      this.close();
    }
  }
  close(){
    let mediaStream = new MediaStream();
        mediaStream= this.video.nativeElement.srcObject;
    let stream = this.video.nativeElement.srcObject;
    let tracks = stream.getTracks();
  
    tracks.forEach(function(track) {
      track.stop();
    });
  
    this.video.nativeElement.srcObject = null;
    
    
   // navigator.mediaDevices.getUserMedia({ video: false });
  }
  openQRCamera(node) {
    var reader = new FileReader();
    reader.onload = function() {
      node.value = "";
      qrcode.callback = function(res) {
        if(res instanceof Error) {
          alert("No QR code found. Please make sure the QR code is within the camera's frame and try again.");
        } else {
          node.parentNode.previousElementSibling.value = res;
        }
      };
      qrcode.decode(reader.result);
    };
    reader.readAsDataURL(node.files[0]);
  }
  public capture(scan) {
    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        // let mediaStream = new MediaStream();
        // mediaStream=stream;
       // this.video.nativeElement.src = mediaStream;
        this.video.nativeElement.srcObject  = stream;
        this.video.nativeElement.load();
        // this.video.nativeElement.src = window.URL.createObjectURL(stream);
       // this.video.nativeElement.onloadedmetadata = function(e) { this.video.nativeElement.play(); };
          this.video.nativeElement.play();
          
      });
     
      
  }
  var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    if(scan=='notscan')
    this.verify();
    console.log("hkvkj");
    this.render(this.captures[0]);
  }
  render(e) {  
    console.log("hiii");
    console.log(e);
    let element: Element = this.renderer.createElement('h1');  
    element.innerHTML = e.result;  
   // this.dummy= e.result;
    console.log(e.result);
   this.renderElement(element);  
    
  }  
  renderElement(element) {  
    for (let node of this.resultElement.nativeElement.childNodes) {  
      this.renderer.removeChild(this.resultElement.nativeElement, node);  
    }  
    this.renderer.appendChild(this.resultElement.nativeElement, element);  
  }
  verify(){
    clearInterval(this.interval);
    console.log(this.details);
    setTimeout(() => {
     this.capture('scan');
     
    }, 3000);
    this.spinnerService.show();
    this._APIService.patientfirstname=this.details.first;
    this._APIService.patientlastname=this.details.last;
    this._APIService.Date=this.details.dob;
    console.log(this.details);
    this._APIService.getValidation(this.details).subscribe(
      (data)=>{
        this.resJSON=JSON.parse(JSON.parse(JSON.stringify(data)).body);
        this._APIService.resJSON = JSON.parse(JSON.parse(JSON.stringify(data)).body);
        console.log(this.resJSON);
       
        this.spinnerService.hide();
        const dialogRef = this.dialog.open(PopupmemberComponent, {
          width: 'auto',
          height:'auto',
          data: {},
          autoFocus: false,
        });
        dialogRef.afterOpen().subscribe(result => {
          document.getElementById('popup_dialog').scrollTop = 0;
          this.selectedIndex=0;
        })
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          
         
        });

      },
      (error)=>{this.spinnerService.hide();
        }
    );
 }
 onVoted(data: Array<string>) {
  this.patient_data=data;
  console.log(this.patient_data);
 // this.selectedIndex=agreed;
}
}
