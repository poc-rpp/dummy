import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { claimresults } from './shared/modal/claimresults';
export class benefits {
  username: string = sessionStorage.getItem('username');
  email: string = "bakerwyatt19@gmail.com";
  group_number: string = "228222";
  max_deductible_non_par_family: string = "1800.00";
  max_deductible_non_par_single: string = "600.00";
  max_deductible_par_family: string = "1200.00";
  max_deductible_par_single: string = "400.00";
  max_oop_non_par_family: string = "12000.00";
  max_oop_non_par_single: string = "6000.00";
  max_oop_par_family: string = "6000.00";
  max_oop_par_single: string = "3000.00";
  member_product_code: string = "80840";
  member_product_code_desc: string = "Anthem Blue card PPO";
  office_visit_copay: string = "25.00";
  password: string = "password";
  patient_dob: string = "1980-01-01";
  patient_first: string = "John";
  patient_last: string = "Dave";
  phone_number: string = "9000178005";
  routine_preventative_care: string = "0";
  specialist_copay: string = "40.00";
  subscriber_address: string = "901 International Pkwy Lake Mary FL 32746";
  subscriber_id: string = "123456789";
  urgent_care_copay: string = "30.00";
  plan_name: string = "plan 2";
  status: string;
}
declare const qrcode: any;
@Injectable()
export class ServiceService {

  public resJSON: any;
  public patientfirstname: string;
  public patientlastname: string;
  public Date: Date;
  public results: any;
  public islogin: boolean = false;
  public benefits1 = new benefits;
  public selectedId;
  public variable;
  public id;
  public username = sessionStorage.getItem('username');
  constructor(private httpClient: HttpClient) { }
  getValidation(details) {
    return this.httpClient.post("https://41mk0fhpyg.execute-api.us-east-1.amazonaws.com/dev", details)
  }
  getProvider(details) {
    console.log(details);
    return this.httpClient.post("https://41mk0fhpyg.execute-api.us-east-1.amazonaws.com/dev/get-member-product", details)
  }
  getRegistration(details) {
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/registration", details)
  }
  reset(details) {
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/password-reset", details)
  }
  forgot(details) {
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/forgot-password", details)
  }
  isLoggedIn(details) {
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/login", details)
  }
  benefits() {
    this.benefits1.username = sessionStorage.getItem('username')
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/benefit-details", this.benefits1)
  }
  profileUpdate(details) {
    console.log(details);
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/profile-update", details)
  }
  emailID(details) {
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/email-id", details)
  }
  populateProfile(details) {
    this.benefits1.username = sessionStorage.getItem('username')
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/profile", this.benefits1)
  }
  planUpdate(details) {
    this.benefits1.username = sessionStorage.getItem('username')
    this.benefits1.status = details.status;
    this.benefits1.plan_name = details.plan;
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/plan-update", this.benefits1)
  }
  getDataDashboard() {
    return this.httpClient.post("https://41mk0fhpyg.execute-api.us-east-1.amazonaws.com/dev/update-dashboard", {})
  }
  dashboardConnect() {
    return webSocket('wss://4ifv0gvm0j.execute-api.us-east-1.amazonaws.com/dev').asObservable();
    // return webSock;
  }
  getPayment(arg0) {
    return this.httpClient.post("https://41mk0fhpyg.execute-api.us-east-1.amazonaws.com/dev/update-payment-status", arg0)
  }
  getBenefitDetails(id) {
    console.log("hii from newpayment56");
    return this.httpClient.post("https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/detailed-benefit-summary", id);
  }
  set(){
    this.variable=8;
  }
  decode(file: any): Observable<string> {



    return new Observable(observer => {



      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e: any) => {

        const data = e.target.result;

        qrcode.callback = (res) => {

          observer.next(res);

          observer.complete();

        };

        qrcode.decode(data);

      };



    });

  }
  // https://8becfn4z1d.execute-api.us-east-1.amazonaws.com/dev/login 
}
