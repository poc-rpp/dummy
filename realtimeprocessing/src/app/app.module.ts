import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MemberdetailsComponent } from './memberdetails/memberdetails.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ClaimsubmissionComponent } from './claimsubmission/claimsubmission.component';
import {MatCardModule, MatDialogModule, MatButtonModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDividerModule, MatGridListModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSidenavModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatFormFieldModule} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from './service.service';
import { A11yModule } from '@angular/cdk/a11y';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { PopupmemberComponent } from './memberdetails/popupmember/popupmember.component';
import { ClaimspopupComponent } from './claimsubmission/claimspopup/claimspopup.component';
import { GetpaidComponent } from './getpaid/getpaid.component';
import { PaymentComponent } from './getpaid/payment/payment.component';
import { LoginComponent } from './login/login.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SelectloginComponent } from './selectlogin/selectlogin.component';
import { SignupComponent } from './signup/signup.component';
import { ActivityComponent } from './activity/activity.component';
import { ForgotComponent } from './forgot/forgot.component';

import { ViewIdCrdsComponent, DialogOverview } from './view-id-crds/view-id-crds.component';
import { BenefitSummaryComponent } from './benefit-summary/benefit-summary.component';
import { MemberprofileComponent, DialogOverview1 } from './memberprofile/memberprofile.component';
import { YourplansComponent,DialogOverviewExampleDialog } from './yourplans/yourplans.component';
import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';
import { NewproviderloginComponent } from './newproviderlogin/newproviderlogin.component';
import { ProviderActivityComponent } from './provider-activity/provider-activity.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { ChartsModule } from 'ng2-charts';
import {WebcamModule} from 'ngx-webcam';
import { NgQrScannerModule } from 'angular2-qrscanner';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MemberdetailsComponent,
    LayoutComponent,
    ClaimsubmissionComponent,
    PopupmemberComponent,
    ClaimspopupComponent,
    GetpaidComponent,
    PaymentComponent,
    LoginComponent,
    SelectloginComponent,
    SignupComponent,
    ActivityComponent,
    ForgotComponent,
    YourplansComponent,
    DialogOverviewExampleDialog,    
    ViewIdCrdsComponent,
    BenefitSummaryComponent,
    MemberprofileComponent,
    DialogOverview,
    DialogOverview1,
    NewproviderloginComponent,
    ProviderActivityComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,           
    MatDatepickerModule,        
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgQRCodeReaderModule,
    MatTabsModule,
    MatExpansionModule,
    ChartsModule,
    WebcamModule,
    NgQrScannerModule,
    

  ],
  exports: [
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,

  ],
  providers: [ServiceService ],
  bootstrap: [AppComponent],
  entryComponents: [
    PopupmemberComponent,ClaimspopupComponent,DialogOverviewExampleDialog,DialogOverview,DialogOverview1
  ]
})
export class AppModule { }
