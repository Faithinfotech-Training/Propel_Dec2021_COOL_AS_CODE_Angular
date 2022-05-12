import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from'src/environments/environment'
import { Observable } from 'rxjs';
import { Labtest } from '../model/labtest'

@Injectable({
  providedIn: 'root'
})
export class LabtestService {

  //declare variables--global
  Labtests: Labtest[]; //list of all Labtests
  formData: Labtest=new Labtest(); //store date in an Labtest

  constructor(private httpClient:HttpClient) { } //HttpClient

  //get All the Labtest or Method for Binding all Labtests
  getAllLabtests()
  {
    this.httpClient.get(environment.apiUrl+'/api/labtests').toPromise().then(response =>
    this.Labtests=response as Labtest[]);
  }
  getLabtests():Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/labtests');
  }
  //get a particular Labtest by id
  getLabtest(testId: number) :Observable<any>
  {
    return this.httpClient.get(environment.apiUrl+'/api/Labtests/'+testId);
  }

  //insert Labtest
  insertLabtest(Labtest_) :Observable<any>
  {
    return this.httpClient.post(environment.apiUrl+'/api/labs/',Labtest_);
  }

  //delete Labtest
  deleteLabtest(testId: number) :Observable<any>
  {
    return this.httpClient.delete(environment.apiUrl+'/api/labtestdelete/'+testId);
  }

}
