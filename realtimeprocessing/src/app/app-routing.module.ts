import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MemberdetailsComponent } from './memberdetails/memberdetails.component';
import { LayoutComponent } from './layout/layout.component';
import { ClaimsubmissionComponent } from './claimsubmission/claimsubmission.component';
import { GetpaidComponent } from './getpaid/getpaid.component';
import { PaymentComponent } from './getpaid/payment/payment.component';
import { LoginComponent } from './login/login.component';
import { SelectloginComponent } from './selectlogin/selectlogin.component';
import { SignupComponent } from './signup/signup.component';
import { ActivityComponent } from './activity/activity.component';
import { ForgotComponent } from './forgot/forgot.component';
import { YourplansComponent } from './yourplans/yourplans.component';
import { ViewIdCrdsComponent } from './view-id-crds/view-id-crds.component';
import { BenefitSummaryComponent } from './benefit-summary/benefit-summary.component';
import { MemberprofileComponent } from './memberprofile/memberprofile.component';
import { NewproviderloginComponent } from './newproviderlogin/newproviderlogin.component';
import { ProviderActivityComponent } from './provider-activity/provider-activity.component';
import { ScannerComponent } from './scanner/scanner.component';


const routes: Routes = [
  {
    path: '',
    component: SelectloginComponent,
  },
  {
    path: 'userprofile',
    component: MemberdetailsComponent,
  },
  {
    path: 'login/:id',
    component: LoginComponent,
  },
  {
    path: 'signup/:id',
    component: SignupComponent,
  },
  {
    path: 'claimsubmission',
    component: ClaimsubmissionComponent,
  },
  {
    path: 'getpaid',
    component: GetpaidComponent,
    children: [                    
      {
          path:'child-one',
          component: PaymentComponent
      }
    ]
  },
  // {
  //   path: 'activity/:id',
  //   component: ActivityComponent,
  // },
  {
    path: 'scanner',
    component: ScannerComponent,
  },
  {
    path: 'forgot/:id',
    component: ForgotComponent,
  },
  {
    path: 'yourplans',
    component: YourplansComponent,
  },
  {
    path: 'viewidcard',
    component: ViewIdCrdsComponent,
  },
  {
    path: 'benefits',
    component: BenefitSummaryComponent,
  },
  {
    path: 'memberprofile',
    component: MemberprofileComponent,
  },
  {
    path: 'newlogin',
    component: NewproviderloginComponent,
  },
  {
    path: 'provideractivity',
    component: ProviderActivityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
