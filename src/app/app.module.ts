import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// import { MatTableModule, MatProgressSpinnerModule, MatDialogModule, MatAutocompleteModule, 
//   MatPaginatorModule, MatToolbarModule, MatSidenavModule, MatSortModule, MatMenuModule, MatIconModule,
//    MatButtonModule,
//    MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import {  MatAutocompleteModule} from '@angular/material/autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
import { StaffComponent } from './staff/staff.component';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { StaffDashboardComponent } from './staff-dashboard/staff-dashboard.component';
import { LabtestComponent } from './labtest/labtest.component';
import { MedicineComponent } from './medicine/medicine.component';
import { AppointmentlistComponent } from './appointmentlist/appointmentlist.component';
import { ViewmedicineComponent } from './viewmedicine/viewmedicine.component';
import { ViewlabtestComponent } from './viewlabtest/viewlabtest.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    PatientComponent,
    LoginComponent,
    StaffDashboardComponent,
    LabtestComponent,
    MedicineComponent,
    AppointmentlistComponent,
    ViewmedicineComponent,
    ViewlabtestComponent
  ],
  imports: [
    BrowserModule,MatAutocompleteModule,
    AppRoutingModule,HttpClientModule,NgxPaginationModule,
    BrowserAnimationsModule,MatDialogModule,
    FormsModule,ReactiveFormsModule,Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
