import { Component, OnInit } from '@angular/core';
import { SlideInOutAnimation } from '../animations';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [SlideInOutAnimation]
})
export class NavbarComponent implements OnInit {
  selectedId: any;
  username: any;
  islogin: any;
  // islogin:boolean=true;
  // animationState = 'out';
  // animationStateSign = 'out';
  constructor(private _APIService:ServiceService,private router: Router,private _route: ActivatedRoute) { }
  // toggleShowDiv(divName: string) {
  //   if (divName === 'divA') {
  //     console.log(this.animationState);
  //     this.animationState = this.animationState === 'out' ? 'in' : 'out';
  //     this.animationStateSign='out';
  //     this.islogin=true;
  //     console.log(this.animationState);
  //   }
  // }
  // toggleShowDiv1(divName: string) {
  //   if (divName === 'divB') {
  //     console.log(this.animationStateSign);
  //     this.animationStateSign = this.animationStateSign === 'out' ? 'in' : 'out';
  //     this.animationState='out';
  //     console.log(this.animationStateSign);
  //   }
  // }
  ngOnInit() {
    if(this.username == undefined) {
      if(this._APIService.hasOwnProperty("username")) {
        this._APIService.username = sessionStorage.getItem('username');
        this._APIService.islogin = true;
      }
    }
    this.username=this._APIService.username;
    this.islogin=this._APIService.islogin;
  }
  ngOnChanges(){
    
    
  }
  remove(){
  sessionStorage.removeItem('username');
  }
  public isLoggedIn() {
    // return this._APIService.isLoggedIn();
}
homepage(){
  this.selectedId=this._APIService.selectedId;
  this.router.navigate(['/activity',this.selectedId]);
  // let params: any = this._route.snapshot.params;
  //   this.selectedId=this._APIService.selectedId;
  //   console.log(this.selectedId);
  //   this.router.navigate(['/activity',this.selectedId]);
}
  // login(){
  //   this.islogin=false;
  // }
}
