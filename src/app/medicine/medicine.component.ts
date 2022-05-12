import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import {Medicine} from '../model/medicine'
import {MedicineService} from '../service/medicine.service'

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss']
})
export class MedicineComponent implements OnInit {

  Entry_View:boolean=true;
  medicines_:Medicine=new Medicine;
  testing:number;
  filter:string;
  page:number=1;

  constructor(public dialogBox: MatDialog, private medicineService_:MedicineService) { }

ngOnInit(): void {
  this.medicineService_.getAllMedicines();
}
Close_Click(){
  this.Entry_View=true;
  this.medicineService_.getAllMedicines();
  this.clr_medicine();
}
Create_new()
{
  this.Entry_View=false;
  this.clr_medicine();
}
clr_medicine()
{
  this.medicines_.medicineId=0;
  this.medicines_.medicineCode="";
  this.medicines_.medicineName="";
  this.medicines_.genericName="";
  this.medicines_.companyName="";
  this.medicines_.unit="";
  this.medicines_.quantity=0;
}
save_medicine()
{
  debugger
    this.medicineService_.insertMedicine(this.medicines_).subscribe(Save_status => {
      debugger
      this.testing=Save_status;
      if(Save_status==1)
      {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
      }
      else{
          const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'updated',Type:"false"}});
        }
        this.Close_Click();
    },
    Rows => {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });    
}
editMedicine(medi:Medicine)
{
  this.Entry_View=false;
  this.medicines_=Object.assign({},medi);
}

deleteMedicine(id:number)
{  
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
      this.medicineService_.deleteMedicine(id).subscribe(response => {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
      this.medicineService_.getAllMedicines();
    },
    error => { 
      console.log(error)
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
  }
  });
  }

}
