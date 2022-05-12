import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {
  Dashboard_Edit:boolean;
  Dashboard_Save:boolean;
  Dashboard_Delete:boolean;

  missedfollowup_count: number = 1;

  followup_count: number = 1;

   
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  myInnerHeight: number;
  issLoading: boolean;

  Login_User: string = "0";
  Menu_Id: number = 9;



  Dashboard_Count:number;
  Dashboard_Count1: number;
  Dashboard_Count2:number;
  Dashboard_Count3:number; 

  Edit_Page_Permission: any;


  Graph_Button: boolean = false;

  Enquiry_Source_title = '';
  Enquiry_Source_type = 'PieChart';
  Enquiry_Source_data = [
    
  ];
  Enquiry_Source_columnNames = [];
  Enquiry_Source_options = {
    is3D: true,
  };
  width = 550;
  height = 400;



  Title_Bar = '';
Type_Bar = 'BarChart';
  Data_Bar = [
 
];
columnNames_Bar = ['Source', 'Count'];
options_Bar = {
  is3D: true,
};

Permissions: any;
  constructor(private router: Router,public dialogBox: MatDialog, private staffService: StaffService) { }

  ngOnInit(): void {
    //this.Get_Dashboard_Count();
  }
  Get_Dashboard_Count(){

    this.staffService.Get_Dashboard_Count().subscribe(Rows => 
    {
      debugger
        //log(Rows)
        this.Dashboard_Count =Rows.returnvalue.Leads[0].Data_Count;  
        this.Dashboard_Count1=Rows.returnvalue.Leads[1].Data_Count; 
        this.Dashboard_Count2=Rows.returnvalue.Leads[2].Data_Count; 
        this.Dashboard_Count3=Rows.returnvalue.Leads[3].Data_Count; 
        // log(this.Dashboard_Count)    
         var Enquiry_Source_data_temp = Rows.returnvalue.Enquiry_Source_data;            
        var result = [];
         this.Enquiry_Source_columnNames=[];
        for (var i in Enquiry_Source_data_temp)
        {
            result.push([Enquiry_Source_data_temp[i].Enquiry_Source_Name, Enquiry_Source_data_temp[i].Data_Count]);
  
        }
       // var data_temp = new google.visualization.DataTable(result);
        this.Enquiry_Source_columnNames.push('Source')
        this.Enquiry_Source_columnNames.push('Count')
        this.Enquiry_Source_data = result;  
        this.Data_Bar=result;     
        this.issLoading = false;
    },
    Rows => 
    {   
       // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        this.issLoading = false;
    });
  }

Click_No1()
{
    this.router.navigateByUrl('/staff');
}
Click_No3()
{
      this.router.navigateByUrl('/labtest');  
}
Click_No2()
{
    this.router.navigateByUrl('/medicine');
   
}
Click_No4()
{
    this.router.navigateByUrl('/Receipt_Summary_Report');
   
}
Click_No5()
{
    this.router.navigateByUrl('/Enquiry_Source_Summary');  
}

}
