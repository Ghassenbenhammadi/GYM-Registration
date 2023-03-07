import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../api.service';
import { User } from '../user';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})
export class CreateRegistrationComponent implements OnInit {
  public packages = ["Monthly","Quarterly","Yearly"];
  public genders = ["Male","Female"];
  public isUpdateActive : boolean=false;
  public importantList:string[] =[
    "Toxic fat reduction",
    "Energy and Endurance",
    "Building lean Muscle",
    "Healthier Digestive System"
  ]

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  constructor(private fb:FormBuilder,private api:ApiService,
    private toastService :NgToastService,private route:ActivatedRoute,
    private router : Router ){}
  ngOnInit(): void {
    this.registerForm=this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      package: [''],
      important: [''],
      haveGymBefore: [''],
      enquiryDate: [''],
    });
    this.registerForm.controls['height'].valueChanges.subscribe(res=>{
      this.calculateBmi(res);
    });
    this.route.params.subscribe(val=>{
      this.userIdToUpdate = val['id'];
      this.api.getRegistratedUseById(this.userIdToUpdate).subscribe(res=>{
        this.isUpdateActive = true;
        this.filFormToUpdate(res);
      })
    })
  }
  submit(){
    this.api.postRegistration(this.registerForm.value).subscribe(res=>{
      this.toastService.success({detail:"Success", summary:"Enquiry Added",duration:3000});
      this.registerForm.reset();
    })  
  }
  calculateBmi(heightValue : number){
    const weight = this.registerForm.value.height;
    const height = heightValue;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch(true){
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Underweight");
        break;
        case(bmi >= 18.5 && bmi <25):
        this.registerForm.controls['bmiResult'].patchValue("Normal");
        break;
        case(bmi >= 25 && bmi <30):
        this.registerForm.controls['bmiResult'].patchValue("Overweight");
        break;
        default:
          this.registerForm.controls['bmiResult'].patchValue("Obese");
          break;
    }

  }
  filFormToUpdate(user :User){
    this.registerForm.setValue({
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email,
      mobile : user.mobile,
      weight : user.weight,
      height : user.height,
      bmi : user.bmi,
      bmiResult : user.bmiResult,
      gender : user.gender,
      requireTrainer : user.requireTrainer,
      package : user.package,
      important : user.important,
      haveGymBefore : user.haveGymBefore,
      enquiryDate : user.enquiryDate,
      

    })

  }
  update(){
    this.api.updateRegistratedUser(this.registerForm.value,this.userIdToUpdate).subscribe(res=>{
      this.toastService.success({detail:"Success", summary:"Update successfully",duration:3000});
      this.registerForm.reset();
      this.router.navigate(['list'])

    })  
  }
 

}
