import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';

import {Staff} from '../model/staff';
import {Doctor} from '../model/doctor';
import { Gender} from '../model/gender';
import { BloodGroup} from '../model/BloodGroup';
import { Department} from '../model/department';
import { Role} from '../model/role';
import { User} from '../model/user';
import { Specialization} from '../model/specialization';

import {StaffService} from '../service/staff.service'
import {PatientService } from '../service/patient.service'

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
// import { _rollupMoment} from 'moment'
//  const moment = _rollupMoment || _moment;
const moment = _moment;

//const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
  dateInput: 'DD/MM/YYYY',
  },
  display: {
  dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
  },
  };
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class StaffComponent implements OnInit {
 
  Entry_View:boolean=true;
  year: any;
  month: any;
  day: any;
  date: any;
  filter:string;
  page:number=1;

  gender:Gender=new Gender();
  Gender_Data:Gender[];
  gender_temp:Gender=new Gender();

  department:Department=new Department();
  Department_Data:Department[];
  Department_temp:Department=new Department();

  bloodGroup:BloodGroup=new BloodGroup();
  BloodGroup_Data:BloodGroup[];
  bloodGroup_temp:BloodGroup=new BloodGroup();

  role_:Role=new Role();
  role_Data:Role[];
  role_temp:Role=new Role();

  specialization_:Specialization=new Specialization;
  specialization_Temp:Specialization=new Specialization;
  specialization_Data:Specialization[];
  
  staff_ : Staff =new Staff;
  staff_Data : Staff =new Staff;
  doctor_ :Doctor =new Doctor;
  User_ :User =new User;
  maxDate=new Date();

  doctor_view:boolean=true;
  constructor(private StaffService_:StaffService,private PatientService_:PatientService, private router: Router, public dialogBox: MatDialog) { }

  ngOnInit(): void {
    this.Load_Gender();
    this.getDepartment();
    this.getRole();
    this.Get_Appointment_List();
    this.staff_.dob = this.New_Date(this.staff_.dob);
    this.staff_.dateOfJoining = this.New_Date(this.staff_.dateOfJoining);
  }
  
getRole(){
  this.PatientService_.getRole().subscribe(Rows => {   
      this.role_Data = Rows;
      this.role_temp.roleId = 0;
      this.role_temp.roleName = "SELECT";
      this.role_Data.unshift(Object.assign({}, this.role_temp));
      this.role_ = this.role_Data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}
  
Load_Gender(){
  this.PatientService_.getGender().subscribe(Rows => {   
      this.Gender_Data = Rows;
      this.gender_temp.genderId = 0;
      this.gender_temp.genderName = "SELECT";
      this.Gender_Data.unshift(Object.assign({}, this.gender_temp));
      this.gender = this.Gender_Data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}

getDepartment(){
  this.PatientService_.getDepartment().subscribe(Rows => {   
      this.Department_Data = Rows;
      this.Department_temp.departmentId = 0;
      this.Department_temp.departmentName = "SELECT";
      this.Department_Data.unshift(Object.assign({}, this.Department_temp));
      this.department = this.Department_Data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}

Create_New()
{
  this.Entry_View=false;
}
close_click(){
  
  this.Entry_View=true;
  this.Get_Appointment_List();
}
role_change()
{
  if(this.role_.roleId!=3){
  this.doctor_view=true;
  }
  else{
    this.doctor_view=false;
  }
}

departmet_change(){
  this.specialization_=null;
  this.specialization_Data=[];
}
//Submit form
save_staff(){
debugger
  if(this.staff_.staffName==null||this.staff_.staffName==""||this.staff_.staffName.length<=2)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'More than two letter is required',Type:"2"}});
    return
  }
  this.staff_.specializationId=this.specialization_.specializationId;
  this.staff_.departmentId=this.department.departmentId;
  this.staff_.roleId=this.role_.roleId;
  this.staff_.genderId=this.gender.genderId;
  this.staff_.dob= this.New_Date(new Date(moment(this.staff_.dob).format('YYYY-MM-DD')));
  this.staff_.dateOfJoining= this.New_Date(new Date(moment(this.staff_.dateOfJoining).format('YYYY-MM-DD')));
 
 
   this.StaffService_.save_staff(this.staff_).subscribe(Save_status => {
     
    if(Save_status==1)
    {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
    }
    else{
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'updated',Type:"false"}});
      }
      this.close_click();
   },
   Rows => {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
   });
 
 }

 
New_Date(Date_)
{
    this.date = Date_;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    if (this.month < 10)
    {
        this.month = "0" + this.month;
    }
    this.day = this.date.getDate().toString();
    if (Number.parseInt(this.day) < 10)
    {
        this.day = "0" + this.day;
    }
    this.date = this.year + "-" + this.month + "-" + this.day;
    return this.date;
}
specialization_Typeahead(event: any) {

  var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;
    if(this.department==null||this.department.departmentId==0 || this.department.departmentId==null)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Department',Type:"3"}});
    }
    else
    {
  this.StaffService_.specialization_Typeahead(this.department.departmentId,Value).subscribe(Rows => {
    
      if (Rows != null) {
     
          this.specialization_Data = Rows;

      }
  },
      Rows => {
      });
    }
}
display_specialization(Specialization_e: Specialization) {
  if (Specialization_e) { return Specialization_e.specializationName; }
}

Get_Appointment_List()
{

  this.StaffService_.Get_Staff_List().subscribe(Rows =>       
  {
    this.staff_Data=Rows;

  },
  Rows => {
  // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
  editStaff(staff:Staff)
  {
    this.Entry_View=false;
    this.staff_=Object.assign({},staff);
    var datePipe = new DatePipe("en-Uk");
    let formatedDate: any=datePipe.transform(this.staff_.dateOfJoining,'yyyy-MM-dd')
    this.staff_.dateOfJoining=formatedDate;
    
    let formaDate: any=datePipe.transform(this.staff_.dob,'yyyy-MM-dd')
    this.staff_.dob=formaDate;

    for (var i = 0; i < this.Gender_Data.length; i++)
    {
    if (this.staff_.genderId == this.Gender_Data[i].genderId)
    this.gender=this.Gender_Data[i];
    }

    for (var i = 0; i < this.role_Data.length; i++)
    {
    if (this.staff_.roleId == this.role_Data[i].roleId)
    this.role_=this.role_Data[i];
    }
  }

}
