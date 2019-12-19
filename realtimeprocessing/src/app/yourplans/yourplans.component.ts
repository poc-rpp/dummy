import { Component, OnInit, Inject } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../memberdetails/popupmember/popupmember.component';
import { Router } from '@angular/router';
class plan{ 
  public plan: string;
  public status: string;
  public dollar:string;
  public dollar2:string
}
@Component({
  selector: 'app-yourplans',
  templateUrl: './yourplans.component.html',
  styleUrls: ['./yourplans.component.css']
})
export class YourplansComponent implements OnInit {
  selectedId: any;
  benefitsSummary:string;
  selectedPlan:string;
  isClicked = false;
  data:string;
  constructor(private _APIService:ServiceService,public dialog: MatDialog,private router: Router) { }
  listOfPlans: { plan: string,dollar:string,dollar2:string, benefits:string, status:string}[] = [
    { "plan": "Basic Health Plan","dollar":"$18.00","dollar2":"$468.00","status":"Enroll", "benefits": "Here is why you need health insurance Health insurance pays for future illnesses/medical treatments without depleting your savings or negatively impacting your family’s financial future.Medical costs are increasing rapidly and for those with insufficient savings, affording medical care becomes a problem during emergencies.Cashless treatment possible with network hospitals while reimbursements are given by insurance companies in other cases.Health insurance plans offer coverage for several types of ailments and surgeries along with other aspects of medical treatment.Health insurance keeps you and your family worry free; you only have to pay a small premium for the same.In many cases, you also get coverage for hospitalization costs, ambulance costs, consultations, medicines, tests and post-hospitalization expenditure.Health-Insurance-cost-of-medical-treatmentWhat are the kinds of health insurance plans available?    There are several kinds of health insurance plans. Here are the main onesIndividual plans-These are basic health insurance plans, covering the hospitalization costs of the person insured.Family plans-These are health insurance plans where all family members can be included in a single coverage model. In this case, a fixed sum assured is provided for any family member who falls ill.Senior citizen plans-These are special insurance policies designed to meet the needs of senior citizens who are above 60 years of ageCritical illness insurance plans-These plans cover specific critical illnesses such as kidney ailments, heart attacks and so on. Cancer insurance and other plans included in this section as well.Personal accident insurance-These plans offer coverage for hospitalization in case of any motor accident.Maternity plans- These policies offer coverage for pre and post natal medical care and delivery expenditure. They also offer coverage for the new-born for a certain duration along with ambulance costs.Unit-linked health insurance plans- These plans offer health insurance coverage while also helping build savings to meet those costs which do not have coverage under the policy. These are insurance-cum-investment plans that help you accumulate corpus."},
    { "plan": "PPO Plan", "status":"Enroll","dollar":"$35.00","dollar2":"$358.00","benefits": "Ready" },
    { "plan": "High Deductible Health Plan","dollar":"$48.00","dollar2":"$1,248.00","status":"Enroll", "benefits": "Started" },
];

  ngOnInit() {
    this.selectedId= this._APIService.selectedId;
  }
  click(item){
    this.benefitsSummary=item.benefits;
    this.selectedPlan=item.plan;
    this.isClicked=true;
  }
  onNoClick(){
    this.router.navigate(['/activity',this.selectedId]);
  }
  textChange(item){
   
    let planDetails = new plan();
    planDetails.plan=item.plan;
    planDetails.status=item.status;
    planDetails.dollar=item.dollar;
    planDetails.dollar2= item.dollar2;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: { name:item.status,plan:planDetails},
     
    });
    
    dialogRef.afterClosed().subscribe(result => {
     
      item.status=result.data;
      

    });
  
       
   
  }
  }
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['./yourplans.component.css']
  })
  export class DialogOverviewExampleDialog {
    flag: boolean;
    status: string;
    enrolled: any;
    selectedId;
    message: string;
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data:{name:string, plan:plan} , private _APIService:ServiceService,private router : Router) {
        console.log(this.data.plan);
        this.message=this.data.plan.plan;
        if( this.data.plan.status=="Enroll"){
          this.flag=true;
        this.status= this.data.plan.status+" in this";
       
        }
        if( this.data.plan.status=="Opt Out"){
          this.flag=false;
          this.status= this.data.plan.status + " from this" ;
         
          }

        // if(data.name =="Opt Out"){
        //   this.message="You have been enrolled successfully";
        // }
        // if(data.name=="Enroll"){
        //   this.message="You have been opted out successfully";
        // }
      }
  back(){
    this.selectedId=this._APIService.selectedId;
   // this.router.navigate(['/activity',this.selectedId]);
   
    if( this.data.plan.status=="Enroll"){
      
      
      this.dialogRef.close({data:"Enroll"});
   
    }
    if( this.data.plan.status=="Opt Out"){
      
      this.dialogRef.close({data:"Opt Out"});
     
     
      }
  }
    onNoClick(): void {
      let planDetails = new plan();
      planDetails.plan= this.data.plan.plan;
      planDetails.status = "Opt Out";
      console.log(planDetails);
      this._APIService.planUpdate(planDetails).subscribe(
        (data:Response)=>{
        console.log("updated succesfully");
    });
    if( this.data.plan.status=="Enroll"){
      this.dialogRef.close({data:"Opt Out"});
   
    }
    if( this.data.plan.status=="Opt Out"){
      
      this.dialogRef.close({data:"Enroll"});
     
      }
    
    }
  
  }
