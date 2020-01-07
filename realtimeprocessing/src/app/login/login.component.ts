import { Component, OnInit, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { ServiceService } from '../service.service';
import { EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { login } from '../shared/modal/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit  {
  error: boolean;
  public logindetails= new login;
  selectedId: string;
  @Input() loginSign;
  @Output() isLoginChanged = new EventEmitter<boolean>();
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router, private _APIService:ServiceService, private _route: ActivatedRoute ) { }
 
  ngOnInit() {
    sessionStorage.removeItem('username');
    this.loginForm = this.formBuilder.group({
      user: [""],
      password: [""],
    });
    let params: any = this._route.snapshot.params;
    this.selectedId=params.id;
  }
  login(){
    // console.log(this.loginForm.value.user); 
    // console.log(this.loginForm.value.password);
  
    this.error=false;
    this.logindetails.username=this.loginForm.value.user;
    this.logindetails.password=this.loginForm.value.password;
    console.log(this.logindetails.username);
    this._APIService.username=this.logindetails.username;
    this._APIService.selectedId=this.selectedId;
    this._APIService.isLoggedIn(this.logindetails).subscribe(
      (data:string)=>{
        console.log(data);
        if(data=="username found, password matches. logging in"){
        sessionStorage.setItem('username', this.loginForm.value.user)
        if(this.selectedId == 'provider') {
          this.router.navigate(['/provideractivity']);
        }
        else {
          this.router.navigate(['/activity',this.selectedId]);
        }
        this._APIService.islogin=true;
        this._APIService.username=this.logindetails.username;
        }
        else{
          this.error=true;
        }
      },
      (error)=>{
       
      console.log(error);
      }
    );
    //this.isLogin=false;
    //this.isLoginChanged.emit(this.isLogin);
  }
}
