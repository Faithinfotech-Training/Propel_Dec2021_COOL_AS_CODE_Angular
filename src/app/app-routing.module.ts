import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { LoginComponent } from './login/login.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { LabtestComponent } from './labtest/labtest.component';
import { MedicineComponent } from './medicine/medicine.component';
import { PatientComponent } from './patient/patient.component';
import { AppointmentlistComponent } from './appointmentlist/appointmentlist.component';
import { ViewlabtestComponent } from './viewlabtest/viewlabtest.component';
import { ViewmedicineComponent } from './viewmedicine/viewmedicine.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'applist', component: AppointmentlistComponent , canActivate: [AuthGuard],data:{role:'3'}},
  { path: 'staff', component: StaffComponent , canActivate: [AuthGuard],data:{role:'1'}},
  { path: 'staffdash', component: StaffDashboardComponent , canActivate: [AuthGuard],data:{role:'1'}},
  { path: 'labtest', component: LabtestComponent , canActivate: [AuthGuard],data:{role:'1'}},
  { path: 'medicine', component: MedicineComponent, canActivate: [AuthGuard],data:{role:'1'} },
  { path: 'patient', component: PatientComponent , canActivate: [AuthGuard],data:{role:'2'}},
  { path: 'labs', component: ViewlabtestComponent , canActivate: [AuthGuard],data:{role:'4'}},
  { path: 'meds', component: ViewmedicineComponent , canActivate: [AuthGuard],data:{role:'5'}},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
