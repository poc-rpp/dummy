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
  value = 'https://assets.econsultancy.com/images/resized/0002/4236/qr_code-blog-third.png'; 
  @ViewChild('result',{static:true}) resultElement: ElementRef;  
  showQRCode; 
  selectedIndex;
  ngOnInit() {
    

  }
  chnageTb(){
    this.selectedIndex = 0;
  }

  constructor(private _route: ActivatedRoute,private _APIService:ServiceService,public dialog: MatDialog,
     private spinnerService: Ng4LoadingSpinnerService,private renderer: Renderer2) {
    this.captures = [];
   }
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
    //  this.value = reader.result;  
      console.log(this.value);  
      this.showQRCode = true;  
     // this.load=true;
      // this.verify();
    }  
  }  
  tabClick(tab) {
    console.log(tab);
    this.selectedIndex=tab.index;
    this.showQRCode= tab.index;
    
    if(this.showQRCode===1){
      this.capture('notscan');
      // setTimeout(() => {
      //   this.capture('scan');
      // }, 3000);
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
    console.log(this.captures[0]);
    this.render('data:image/png;base64,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');
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
    // setTimeout(() => {
    //  this.capture('scan');
     
    // }, 3000);
    this.spinnerService.show();
    this._APIService.patientfirstname=this.details.first;
    this._APIService.patientlastname=this.details.last;
    this._APIService.Date=this.details.dob;
    console.log(this.details);
    this._APIService.getValidation(this.details).subscribe(
      (data)=>{
        // this.resJSON=JSON.parse(JSON.parse(JSON.stringify(data)).body);
        // this._APIService.resJSON = JSON.parse(JSON.parse(JSON.stringify(data)).body);
        // console.log(this.resJSON);
       
        // this.spinnerService.hide();
        // const dialogRef = this.dialog.open(PopupmemberComponent, {
        //   width: 'auto',
        //   height:'auto',
        //   data: {},
        //   autoFocus: false,
        // });
        // dialogRef.afterOpen().subscribe(result => {
        //   document.getElementById('popup_dialog').scrollTop = 0;
          
        // })
        // dialogRef.afterClosed().subscribe(result => {
        //   console.log('The dialog was closed');
          
         
        // });

      },
      (error)=>{this.spinnerService.hide();
        }
    );
 }
 qrReading(string){
  this.selectedIndex=0;
 this.details.id=string;
 this.verify();
 }
 onVoted(index) {
  this.selectedIndex=index;
}
emitIndex(){
  this.selectedIndex=0;
}
}
