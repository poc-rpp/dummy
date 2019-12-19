import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, Input } from '@angular/core';
import { memberdetails } from '../shared/modal/memberdetails';
import { ServiceService } from '../service.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { PopupmemberComponent } from './popupmember/popupmember.component';
import { responseTransaction } from '../shared/modal/responseTransaction';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {
  
  constructor(private _APIService:ServiceService,public dialog: MatDialog, private spinnerService: Ng4LoadingSpinnerService,private renderer: Renderer2) {
    this.captures = [];
   }
   @Input() isScanned: boolean;
  public details = new memberdetails;
  public resJSON:any;
  public patientfirstname:string;
  public patientlastname:string;
  loading=true;
  interval;
  load:boolean=false;
  subscription: Subscription;
  dummy:string;
  data: Date= new Date;
  @ViewChild("video",{static:true})
public video: ElementRef;

@ViewChild("canvas",{static:false})
public canvas: ElementRef;

public captures: Array<any> = [];
  ngOnInit() {
    console.log("jkfvkjr"); 
   console.log(this.isScanned); 
  }
  next(){
    console.log(this.patientfirstname);
  }
  ngOnChanges(changes) {
    if(this.isScanned==true)
    this.verify();
  }
  elementType = 'url';  
  public imagePath;  
  value : any;  
  @ViewChild('result',{static:true}) resultElement: ElementRef;  
  showQRCode: boolean = false;  
  preview(files) {  

    if (files.length === 0)  
      return;  
    var mimeType = files[0].type;  
    if (mimeType.match(/image\/*/) == null) {  
      alert("Only images are supported.");  
      return;  
    }  
    var reader = new FileReader();  
    reader.readAsDataURL(files[0]);
    // console.log(reader.readAsDataURL(files[0]));
    reader.onload = (_event) => {  
      this.value = reader.result;  
      console.log(this.value);  
      this.showQRCode = true;  
      this.load=true;
      // this.verify();
    }  
  }  
  
  render(e) {  
    console.log("hiii");
    console.log(e);
    let element: Element = this.renderer.createElement('h1');  
    element.innerHTML = e.result;  
    this.dummy= e.result;
    console.log(e.result);
   this.renderElement(element);  
    
  }  
  public ngAfterViewInit() {
   
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
public capture() {
  
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
  this.load=true;
  this.loading=true;

}
  renderElement(element) {  
    for (let node of this.resultElement.nativeElement.childNodes) {  
      this.renderer.removeChild(this.resultElement.nativeElement, node);  
    }  
    this.renderer.appendChild(this.resultElement.nativeElement, element);  
  }  
  startTimer() {
    this.loading=false;
    this.interval = setInterval(() => {
     this.load=false;
     this.verify();
    },5000)
  }
  verify(){
   
    this.loading=false;
    this.load=false;
    clearInterval(this.interval);
    console.log(this.details);
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
        this.loading = false;
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

      },
      (error)=>{this.spinnerService.hide();
        this.loading=true;}
    );
 }
}
