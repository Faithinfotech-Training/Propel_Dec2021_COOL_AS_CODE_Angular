import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import {MatDialog} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { User } from '../model/user'
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //declare varaibles
  loginForm: FormGroup;
  isSubmitted= false;
  error: string = '';

  //user object
  loginUser: User;

  constructor(public dialogBox: MatDialog, private router: Router,private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //create a Reactive form
    this.loginForm = this.formBuilder.group({
    //Form Control name
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]]
    });
    
  }

  //Get all controles==rs for validation
  get formControls() {
    return this.loginForm.controls;
  }

  //check credentials
  loginCredentials() {
    console.log(this.loginForm.value)
    this.isSubmitted=true;
    //form is invalid
    if (this.loginForm.invalid){
      this.error="Sorry! Invalid Entry. Try again"; 
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            
      return;
    }

    //form is valid- navigate
    if(this.loginForm.valid){
      //call webservice
      this.authService.loginVerify(this.loginForm.value)
        .subscribe(response=>{
          this.error="";
          console.log(response);

          sessionStorage.setItem('USERID',response.userId.toString());
          sessionStorage.setItem('STAFFID',response.staffId.toString());
          sessionStorage.setItem('USERNAME',response.userName);
          sessionStorage.setItem('ACCESS_ROLE',response.roleId.toString());
          

          if(response==null){
            this.error="Invalid user name and/or password";
            //const dialogRef = this.dialogBox.open( DialogboxComponent, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            
     
          }

          //check the role and redirect to the respective page
          else if(response.roleId===1){
            this.router.navigateByUrl('/staffdash')

          }else if(response.roleId===2){
            this.router.navigateByUrl('/patient')

          }else if(response.roleId===3){
            this.router.navigateByUrl('/applist')

          }else if(response.roleId===4){
            this.router.navigateByUrl('/labs')

          }else if(response.roleId===5){
            this.router.navigateByUrl('/meds')

          }else{
            this.error="Sorry.. You are not allowed to access the system";
                 
          }
        },
        error=>{
          console.log(error);
          this.error="Sorry! Invalid username or password";
         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Sorry! Invalid username or password',Type:"2"}});
            
     
        }
        )
    }
  }

}