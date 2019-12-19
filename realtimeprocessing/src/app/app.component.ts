import { Component } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServiceService } from './service.service';
import { Router } from '@angular/router';
import { SlideInOutAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [SlideInOutAnimation]
})
export class AppComponent {
  animationState = 'in';
  islogin:boolean=true;
  constructor(private _APIService:ServiceService ,private router: Router){

  }
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      console.log(this.animationState);
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
      console.log(this.animationState);
    }
  }
  loginChanged(islogin:boolean){
    this.islogin=islogin;
  }
  title = 'realtimeprocessing';
}
