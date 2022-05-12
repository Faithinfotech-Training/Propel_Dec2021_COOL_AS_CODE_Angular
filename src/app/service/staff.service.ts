import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from'src/environments/environment'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpClient:HttpClient) { } //HttpClient

  // insertEmployee(emp: Employee) :Observable<any>
  // {
  //   return this.httpClient.post(environment.apiUrl+'/api/employees/',emp);
  // }

save_staff(Staff_) :Observable<any>{
  debugger
    return this.httpClient.post(environment.apiUrl +'/api/staffssave/', Staff_);
}
Get_Dashboard_Count(): Observable<any> {
  return this.httpClient.get(environment.apiUrl + '/api/dashboard');  
}
Get_Staff_List(): Observable<any> {
  return this.httpClient.get(environment.apiUrl + '/api/stafflist');  
}
specialization_Typeahead(deptId,speName): Observable<any> {
  if(speName==undefined||speName==null)
  speName='';
  return this.httpClient.get(environment.apiUrl + '/api/spcl/'+ deptId + '&' + speName);
}
}
