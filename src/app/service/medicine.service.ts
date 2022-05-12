import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import {environment} from'src/environments/environment'
import { Observable } from 'rxjs';
import { Medicine } from '../model/medicine'
@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  
  //declare variables--global
  Medicines: Medicine[]; //list of all medicines
  formData: Medicine=new Medicine(); //store date in an Labtest

  constructor(private httpClient:HttpClient) { } //HttpClient

  //get All the Labtest or Method for Binding all medicines
  getAllMedicines()
  {
    this.httpClient.get(environment.apiUrl+'/api/medicines').toPromise().then(response =>
    this.Medicines=response as Medicine[]);
  }
  getAllMedicinesdrop():Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/medicines');
  }
  //get a particular Medicine by id
  getMedicine(medicineId: number) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/medicines/'+medicineId);
  }

  //insert Medicine
  // insertMedicine(Medicine) :Observable<any>
  // {
  //   debugger
  //   return this.httpClient.post(environment.apiUrl+'/api/medicinesave/',Medicine);
    
  // }

  //insert Patient
  insertMedicine(medicines_) :Observable<any>
  {
    debugger
    return this.httpClient.post(environment.apiUrl+'/api/medicinesave/',medicines_);
  }

  //delete Medicine
  deleteMedicine(medicineId: number) :Observable<any>
  {
    return this.httpClient.delete(environment.apiUrl+'/api/medicinedelete/'+medicineId);
  }

}
