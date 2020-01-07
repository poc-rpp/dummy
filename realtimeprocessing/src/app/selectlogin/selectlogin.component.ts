import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectlogin',
  templateUrl: './selectlogin.component.html',
  styleUrls: ['./selectlogin.component.css']
})
export class SelectloginComponent implements OnInit {
  islogin:boolean=true;

  constructor() { }

  ngOnInit() {
  }
  login(){
    this.islogin=false;
  }
}
