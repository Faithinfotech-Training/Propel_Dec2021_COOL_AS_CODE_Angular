import { Component, OnInit } from '@angular/core';
import {Labtest} from '../model/labtest'


import {LabtestService} from '../service/labtest.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';

@Component({
  selector: 'app-labtest',
  templateUrl: './labtest.component.html',
  styleUrls: ['./labtest.component.scss']
})
export class LabtestComponent implements OnInit {

  Entry_View:boolean=true;
  labtest_:Labtest=new Labtest;
  testing:number;
  filter:string;
  page:number=1;

  constructor(public dialogBox: MatDialog, private LabtestService_:LabtestService) { }

ngOnInit(): void {
  this.LabtestService_.getAllLabtests();
}
Close_Click(){
  this.Entry_View=true;
  this.LabtestService_.getAllLabtests();
  this.clr_labtest();
}
Create_new()
{
  this.Entry_View=false;
  this.clr_labtest();
}
clr_labtest()
{
  this.labtest_.testId=0;
  this.labtest_.testCode="";
  this.labtest_.testName="";
}
save_test()
{
  if(this.labtest_.testName==null||this.labtest_.testName==""||this.labtest_.testName.length<2)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'More than two letter is required',Type:"2"}});
    return
  }
  if(this.labtest_.unitPrice==null||this.labtest_.unitPrice==0)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Amount',Type:"2"}});
    return
  }
    this.LabtestService_.insertLabtest(this.labtest_).subscribe(Save_status => {
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
editLab(lab_e:Labtest)
{
  this.Entry_View=false;
  this.labtest_=Object.assign({},lab_e);
}

deleteLab(id:number)
{  
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:true,Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>
    {
    if(result=='Yes')
    {
      this.LabtestService_.deleteLabtest(id).subscribe(response => {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type: "false"}});
      this.LabtestService_.getAllLabtests();
    },
    error => { 
      console.log(error)
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
  }
  });
  }

//     error=>{
    // this.employeeService.deleteEmployee(id).subscribe(response=>{
    //   this.employeeService.getAllEmployees();
//       console.log(error)
//     }
 }
