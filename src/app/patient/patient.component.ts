import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {MatDialog} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

import { Gender} from '../model/gender';
import { BloodGroup} from '../model/BloodGroup';
import { Department} from '../model/department';
import { Patient} from '../model/patient';
import { Appointment} from '../model/appointment';
import { Doctor} from '../model/doctor';
import {PatientService } from '../service/patient.service'

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
import { Staff } from '../model/staff';
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
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  providers: [
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PatientComponent implements OnInit {
  
  Entry_View:boolean=true;
  SearchView:boolean=false;
  consultationview:boolean=true;
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

  patient:Patient=new Patient;
  patient_data:Patient;
  Login_User:string;
  appointment:Appointment=new Appointment();
  appointment_temp:Appointment=new Appointment();
  appointment_data:Appointment[];

  
  doctor_:Staff=new Staff;
  doctor_temp:Staff=new Staff;
  doctor_data:Staff[];
  constructor(private PatientService_:PatientService, public dialogBox: MatDialog, private router: Router) { }

ngOnInit(): void {
  this.Login_User=sessionStorage.getItem(("STAFFID"));
    this.Load_Gender();
    this.getDepartment();
    this.getBloodGroup();
    this.Get_Appointment_List();
}
clr_patient()
{
    this.patient.patientId=0;
    this.patient.staffId=0;
    this.patient.patientName='';
    this.patient.patientNo='';
    this.patient.mobile='';
    this.patient.email='';
    this.patient.genderId=0;
    this.patient.bloodGroupId=0;
    this.patient.dob=new Date;
    this.patient.dob = this.New_Date(this.patient.dob);
    this.patient.address='';
    this.patient.createdDate=new Date;
    this.patient.createdDate = this.New_Date(this.patient.createdDate);
    this.patient.modifiedDate=new Date;
    this.patient.modifiedDate = this.New_Date(this.patient.modifiedDate);
    this.patient.isActive=false;
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

getBloodGroup(){
  this.PatientService_.getBloodGroup().subscribe(Rows => {   
      this.BloodGroup_Data = Rows;
      this.bloodGroup_temp.bloodGroupId = 0;
      this.bloodGroup_temp.bloodGroupName = "SELECT";
      this.BloodGroup_Data.unshift(Object.assign({}, this.bloodGroup_temp));
      this.bloodGroup = this.BloodGroup_Data[0];
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
Save_Patient(){
  this.patient.bloodGroupId=this.bloodGroup.bloodGroupId;
  this.patient.genderId=this.gender.genderId;
  this.patient.staffId=Number(this.Login_User);
  this.patient.dob= this.New_Date(new Date(moment(this.patient.dob).format('YYYY-MM-DD')));
   this.PatientService_.insertPatient(this.patient).subscribe(Save_status => {
    
     if(Save_status==1){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
     }
     else{
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Updated',Type:"false"}});
    
     }
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


 Get_Appointment_List()
{

  this.PatientService_.getPatients().subscribe(Rows =>       
  {
    this.patient_data=Rows;

  },
  Rows => {
  // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
close_click()
{

  this.Entry_View=true;
  this.SearchView=false;
  this.consultationview=true;
  this.clr_patient();
}
Create_New()
{
  this.Entry_View=false;
  this.SearchView=true;
  this.consultationview=true;
  this.clr_patient();
}
Appointment(patientId,patientName)
{
  this.appointment.patientId=patientId;
  this.appointment.patientName=patientName;
  this.Entry_View=true;
  this.SearchView=true;
  this.consultationview=false;

}
editPatient(patiente:Patient)
{
  this.patient=Object.assign({},patiente);

  this.Entry_View=false;
  this.SearchView=true;

  var datePipe = new DatePipe("en-Uk");
  let formatedDate: any=datePipe.transform(this.patient.dob,'yyyy-MM-dd')
  this.patient.dob=formatedDate;

    for (var i = 0; i < this.Gender_Data.length; i++)
    {
    if (this.patient.genderId == this.Gender_Data[i].genderId)
    this.gender=this.Gender_Data[i];
    }
    
    for (var i = 0; i < this.BloodGroup_Data.length; i++)
    {
    if (this.patient.bloodGroupId == this.BloodGroup_Data[i].bloodGroupId)
    this.bloodGroup=this.BloodGroup_Data[i];
    }
}
doctor_Typeahead(event: any) {

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
  this.PatientService_.get_doctor_department(this.department.departmentId,Value).subscribe(Rows => {
   
      if (Rows != null) {
     
          this.doctor_data = Rows;
      }
  },
      Rows => {
      });
    }
}
display_doctor(staff_e: Staff) {
  if (staff_e) { return staff_e.staffName; }
}
department_change()
{
  this.doctor_=null;
  this.doctor_data=[];
  this.appointment.consultationFees=0;
}
doctor_change()
{
  this.appointment.consultationFees=this.doctor_.consultationFees;
}
save_appointment(){

  this.appointment.doctorId=this.doctor_.doctorId;
  this.appointment.departmentId=this.doctor_.departmentId;
  this.appointment.appointmentDate= this.New_Date(new Date(moment(this.appointment.appointmentDate).format('YYYY-MM-DD')));
   this.PatientService_.insertPatient(this.appointment).subscribe(Save_status => {
    
     if(Save_status==1){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
     }
     else{
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Updated',Type:"false"}});
    
     }
   },
   Rows => {
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
   });

}

}
