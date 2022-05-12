import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import {environment} from'src/environments/environment'
import { Observable } from 'rxjs';
import { Patient } from '../model/patient'
import { Gender } from '../model/gender'
@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //declare variables--global
  Patients: Patient[]; //list of all Patients
  formData: Patient=new Patient(); //store date in an Labtest
  Gender:Gender[];
  constructor(private httpClient:HttpClient) { } //HttpClient

  //get All the Labtest or Method for Binding all Patients
  getAllPatients()
  {
    this.httpClient.get(environment.apiUrl+'/api/patients').toPromise().then(response =>
    this.Patients=response as Patient[]);
  }
  // getGender()  
  // {
  //   debugger
  //    this.httpClient.get(environment.apiUrl+'/api/gender').toPromise().then(response =>
  //     this.Gender=response as Gender[]);
  //     debugger
  // }
  //get a particular Patient by id
  getPatient(PatientId: number) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/Patients/'+PatientId);
  }
  getPatients() :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/patientall');
  }
  //insert Patient
  insertPatient(Patient) :Observable<any>
  {
    debugger
    return this.httpClient.post(environment.apiUrl+'/api/patients/',Patient);
  }

  //delete Patient
  deletePatient(PatientId: number) :Observable<any>
  {
    return this.httpClient.delete(environment.apiUrl+'/api/patientdelete/'+PatientId);
  }

  get_doctor_department(deptId,docName): Observable<any> {
    if(docName==undefined||docName==null)
    docName='';
    return this.httpClient.get(environment.apiUrl + '/api/doctors/'+ deptId + '&' + docName);
  }
  //Department
  getDepartment()  :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/departments')
  }

  //Department
  getGender()  :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/gender')
  }
  getRole()  :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/role')
  }
  //getBloodGroup
  getBloodGroup()  :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/bloodgroups')
  }
}
