import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NestBackendService {
  hostname = window.location.hostname; 
  devURL:string = `http://${this.hostname}:3000`;
  productURL:string = ``;

  base_url:string= this.devURL;

  constructor(private http:HttpClient) { }

  f_get():Observable<any>{

    return this.http.get(this.base_url+'/get')
  }

  f_post(req_body : any):Observable<any>{

    return this.http.post(this.base_url+'/post',req_body);
  
  }
 



}