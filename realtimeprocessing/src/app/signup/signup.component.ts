import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { signupMember } from '../shared/modal/signupMember';

import { signupEmpGrp } from '../shared/modal/signupEmpGrp';
import { signupInsurancePayer } from '../shared/modal/signupInsurancePayer';
import { signupProvider } from '../shared/modal/signupProvider';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public details;
  signUpForm:FormGroup;
  selectedId: string;
  questions: any[] = ["What city did you first fly into?",
  "What was the last name of your third grade teacher?",
  "In what city and country do you want to retire?",
  "What is your favorite flower?",
  "What is your favorite gum?",
  "Who is the author of your favorite book?",
  ];
  constructor(private formBuilder: FormBuilder,private router: Router, private _APIService:ServiceService,private _route: ActivatedRoute ) { }

  ngOnInit() {
    let params: any = this._route.snapshot.params;
    this.selectedId=params.id;
    if( this.selectedId=='member'){
      this.details= new signupMember;
    this.signUpForm= this.formBuilder.group({
      member_firstname: [""],
      member_lastname: [""],
      emp_grp:[""],
      phone_number:[""],
      emp_Id:[""],
      dob:[],
      email:[""],
      username:[""],
      password:[""],
      question:[""],
      answer:[""],
    })
  }
  if( this.selectedId=='provider'){
    this.details=new signupProvider;
    this.signUpForm= this.formBuilder.group({
      company_name: [""],
      tax_id: [""],
      npi:[""],
      state:[""],
      speciality:[""],
      phone_number:[""],
      username:[""],
      password:[""],
      question:[""],
      answer:[""],
     
    })
  }
  if( this.selectedId=='employer group'){
    this.details= new signupEmpGrp;
    this.signUpForm= this.formBuilder.group({
      company_name: [""],
      tax_id: [""],
      grp_size:[""],
      state:[""],
      benefits_offered:[""],
      phone_number:[""],
      username:[""],
      password:[""],
      question:[""],
      answer:[""],
     
    })
  }
  if( this.selectedId=='Insurance payers'){
    this.details= new signupInsurancePayer;
    this.signUpForm= this.formBuilder.group({
      company_name: [""],
      tax_id: [""],
      state:[""],
      email:[""],
      username:[""],
      password:[""],
      question:[""],
      answer:[""],
     
    })
  }
  }
  signUp(){
    console.log(this.router.navigate['/userprofile']);
   // this.router.navigate(['/activity',this.selectedId]);
    if( this.selectedId=='member'){

      this.details.member_firstname = this.signUpForm.value.member_firstname;
      this.details.member_lastname= this.signUpForm.value.member_lastname;
      this.details.emp_grp= this.signUpForm.value.emp_grp;
      this.details.emp_Id= this.signUpForm.value.emp_Id;
      this.details.phone_number= this.signUpForm.value.phone_number;
      this.details.dob= this.signUpForm.value.dob;
      this.details.email= this.signUpForm.value.email;
      this.details.username= this.signUpForm.value.username;
      this.details.password= this.signUpForm.value.password;
      this.details.question= this.signUpForm.value.question;
      this.details.answer= this.signUpForm.value.answer;
    }
    if( this.selectedId=='provider'){
      this.details.company_name = this.signUpForm.value.company_name;
      this.details.tax_id= this.signUpForm.value.tax_id;
      this.details.npi= this.signUpForm.value.npi;
      this.details.state= this.signUpForm.value.state;
      this.details.speciality= this.signUpForm.value.speciality;
      this.details.phone_number= this.signUpForm.value.phone_number;
      this.details.username= this.signUpForm.value.username;
      this.details.password= this.signUpForm.value.password;
      this.details.question= this.signUpForm.value.question;
      this.details.answer= this.signUpForm.value.answer;
    }
    if( this.selectedId=='employer group'){
      this.details.company_name = this.signUpForm.value.company_name;
      this.details.tax_id= this.signUpForm.value.tax_id;
      this.details.grp_size= this.signUpForm.value.grp_size;
      this.details.state= this.signUpForm.value.state;
      this.details.benefits_offered= this.signUpForm.value.benefits_offered;
      this.details.phone_number= this.signUpForm.value.phone_number;
      this.details.username= this.signUpForm.value.username;
      this.details.password= this.signUpForm.value.password;
      this.details.question= this.signUpForm.value.question;
      this.details.answer= this.signUpForm.value.answer;
    }
    if( this.selectedId=='Insurance payers'){
      this.details.company_name = this.signUpForm.value.company_name;
      this.details.tax_id= this.signUpForm.value.tax_id;
      this.details.state= this.signUpForm.value.state;
      this.details.email= this.signUpForm.value.email;
      this.details.username= this.signUpForm.value.username;
      this.details.password= this.signUpForm.value.password;
      this.details.question= this.signUpForm.value.question;
      this.details.answer= this.signUpForm.value.answer;
    }
    console.log(this.details);
    this._APIService.getRegistration(this.details).subscribe(
      (data:Response)=>{
        console.log(data);
        this.router.navigate(['/']);
      }
    );
    
  }
}
