import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import {Prescription} from '../model/prescription';
import {Appointment} from '../model/appointment';
import {Medicineprescription} from '../model/medicineprescription';
import {Testprescription} from '../model/testprescription';
import {Medicine} from '../model/medicine';
import {Labtest} from '../model/labtest';
import {Medicineinterval} from '../model/medicineinterval';
import {AppointmentlistService} from '../service/appointmentlist.service'
import {MedicineService} from '../service/medicine.service';
import {LabtestService} from '../service/labtest.service';

@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.scss']
})
export class AppointmentlistComponent implements OnInit {

  Entry_View:boolean=true;
  diagonsis_view:boolean=true;
  diagonsis_hide:boolean=true;
  Login_User:string;
  filter:string;
  page:number=1;
  Appointment_Data:Appointment[];
  prescription_:Prescription=new Prescription();;
  appointment:Appointment=new Appointment();;
  Medicineprescription_Data:Medicineprescription[];
  Medicineprescription_:Medicineprescription=new Medicineprescription();
  Testprescription_Data:Testprescription[];
  Testprescription_:Testprescription=new Testprescription();
  appointmentId:number;
  presId:number;
  staffId:number;

  medicine:Medicine=new Medicine();
  medicine_data:Medicine[];
  medicine_temp:Medicine=new Medicine();

  test:Labtest=new Labtest();
  test_temp:Labtest=new Labtest();
  test_data:Labtest[];

  interval:Medicineinterval=new Medicineinterval();
  interval_temp:Medicineinterval=new Medicineinterval();
  interval_data:Medicineinterval[];
  constructor(private AppointmentlistService:AppointmentlistService, private LabtestService :LabtestService ,private MedicineService_: MedicineService,public dialogBox: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.Login_User=sessionStorage.getItem(("STAFFID"));
    this.Get_Appointment_List();
    this.Testprescription_Data=[];
    this.Medicineprescription_Data=[];
    this.Load_Medicine();
    this.Load_Interval();
    this.Load_Lab();
  }

view_click(appo:Appointment)
  {
    this.Entry_View=false;
    this.appointment=Object.assign({},appo);
    this.appointmentId=this.appointment.appointmentId;
    this.staffId=this.appointment.staffId;
    this.diagonsis_hide=true;
    this.diagonsis_view=false;
  }
  
Load_Interval(){
  this.AppointmentlistService.get_Interval().subscribe(Rows => {   
    console.log(Rows)
      this.interval_data = Rows;
      this.interval_temp.medicineIntervalId = 0;
      this.interval_temp.medicineIntervalName = "SELECT";
      this.interval_data.unshift(Object.assign({}, this.interval_temp));
      this.interval = this.interval_data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}
Load_Medicine(){
  this.MedicineService_.getAllMedicinesdrop().subscribe(Rows => {   
      this.medicine_data = Rows;
      this.medicine_temp.medicineId = 0;
      this.medicine_temp.medicineName = "SELECT";
      this.medicine_data.unshift(Object.assign({}, this.medicine_temp));
      this.medicine = this.medicine_data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}

Load_Lab(){
  this.LabtestService.getLabtests().subscribe(Rows => {
      this.test_data = Rows;
      this.test_temp.testId = 0;
      this.test_temp.testName = "SELECT";
      this.test_data.unshift(Object.assign({}, this.test_temp));
      this.test = this.test_data[0];
  },
  Rows => {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
  });
}

Get_Appointment_List()
{

  this.AppointmentlistService.Get_Appointment_List(Number(this.Login_User)).subscribe(Rows =>       
  {
    this.Appointment_Data=Rows;

  },
  Rows => {
  // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
clr_medcine(){
  this.Medicineprescription_.course="";

  this.Medicineprescription_.medicineprescriptionId=0;
  if(this.medicine_data!=null && this.medicine_data != undefined)
  this.medicine=this.medicine_data[0];

  if(this.interval_data!=null && this.interval_data != undefined)
  this.interval=this.interval_data[0];
}
Add_Medicine()
{
  if (this.presId>0)
  {
    this.Medicineprescription_.prescriptionId=this.presId;
    this.Medicineprescription_.medicineId=this.medicine.medicineId;
    this.Medicineprescription_.medicineInterval=this.interval.medicineIntervalId;
    this.AppointmentlistService.saveMedicinePrescription(this.Medicineprescription_).subscribe(Save_status => {
      if(Save_status==1){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Medicine Added',Type:"false"}});
      }
      else{
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Medicine Updated',Type:"false"}});
      } 
      this.clr_medcine(); 
      this.Medicine_List_Data();
    },
    Rows => {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });    
  }
  else{
  const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'First Add Prescription', Type: "2" } });
  }
}
Medicine_List_Data()
{  
  this.AppointmentlistService.Get_Medicine_prescription(this.presId).subscribe(Rows =>       
    {
      this.Medicineprescription_Data=Rows;  
    },
    Rows => {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
edit_med(med:Medicineprescription)
{
  this.Medicineprescription_=Object.assign({},med);

  for (var i = 0; i < this.medicine_data.length; i++)
  {
    if (this.Medicineprescription_.medicineId == this.medicine_data[i].medicineId)
    this.medicine=this.medicine_data[i];
  }
  
  for (var i = 0; i < this.interval_data.length; i++)
  {
    if (this.Medicineprescription_.medicineInterval == this.interval_data[i].medicineIntervalId)
    this.interval=this.interval_data[i];
  }
}

clr_lab(){

  if(this.test_data!=null && this.test_data != undefined)
  this.test=this.test_data[0];
  this.Testprescription_.testprescriptionId=0;
}
Add_Lab()
  {
    if (this.presId>0)
    {
      this.Testprescription_.prescriptionId=this.presId;
      this.Testprescription_.testId=this.test.testId;
      this.AppointmentlistService.saveTestPrescription(this.Testprescription_).subscribe(Save_status => {
      if(Save_status==1){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Test Added',Type:"false"}});
      }
      else{
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Test Updated',Type:"false"}});
      }
      this.clr_lab();
        this.Get_Lab_prescription();
      },
      Rows => {
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });    
    }
    else{
    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'First Add Prescription', Type: "2" } });
    }
}

Get_Lab_prescription()
{
  
  this.AppointmentlistService.Get_Lab_prescription(this.presId).subscribe(Rows =>       
    {
      this.Testprescription_Data=Rows;  
    },
    Rows => {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
}
edit_lab(labe:Testprescription)
{
  this.Testprescription_=Object.assign({},labe);

  for (var i = 0; i < this.test_data.length; i++)
  {
  if (this.Testprescription_.testId == this.test_data[i].testId)
  this.test=this.test_data[i];
  }
}
save_prescription()
{
    this.prescription_.appointmentId=this.appointmentId;
    this.AppointmentlistService.insertPrescription(this.prescription_).subscribe(Save_status => {
      this.presId=Save_status;
      if(this.presId>0)
      {      
        this.diagonsis_hide=false;
        this.diagonsis_view=true; 
      }
        //this.Close_Click();
    },
    Rows => {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });    
}
}
