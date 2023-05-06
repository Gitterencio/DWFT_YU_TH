import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { CreateUserDTO, LoginEmailUserDTO } from 'dw-data-types/dto/users.dto';
import { UpdateProyectoDTO} from 'dw-data-types//dto/proyectos.dto';

@Injectable({
  providedIn: 'root'
})
export class NestBackendService {
  hostname = window.location.hostname; 
  devURL:string = `http://${this.hostname}:3000`;
  productURL:string = `https://dwbkyuth-production.up.railway.app`;

  base_url:string= this.devURL;

  constructor(private http:HttpClient,
    private localstorage: LocalStorageService) { }


  //USUARIO
  singUpUser(body:CreateUserDTO):Observable<any>{

    return this.http.post(this.base_url+'/users',body);
  
  }

  singInUser(body:LoginEmailUserDTO):Observable<any>{

    return this.http.post(this.base_url+'/auth',body);
  
  }

  //PROYECTO
  createNewProyecto(body:{name:string}):Observable<any>{

    const token =this.localstorage._getDataLocalStorege('access_token') 
    var headers= {authorization:`Yuno ${token}`}

    return this.http.post(this.base_url+'/proyectos',body,{headers});
  
  }

  getUserProyectos():Observable<any>{

    const token =this.localstorage._getDataLocalStorege('access_token') 
    var headers= {authorization:`Yuno ${token}`}
    return this.http.get(this.base_url+'/proyectos/user/proyectos',{headers});
  
  }
 
  getEditingProyectos():Observable<any>{

    const token =this.localstorage._getDataLocalStorege('access_token') 
    const proyectoId = this.localstorage._getStringLocalStorege('proyectoId')
    var headers= {authorization:`Yuno ${token}`}
    return this.http.get(this.base_url+'/proyectos/'+proyectoId,{headers});
  
  }

  saveEditingProyecto(body:UpdateProyectoDTO):Observable<any>{

    const token =this.localstorage._getDataLocalStorege('access_token') 
    const proyectoId = this.localstorage._getStringLocalStorege('proyectoId')
    var headers= {authorization:`Yuno ${token}`}
    return this.http.put(this.base_url+'/proyectos',body,{headers});
  
  }

  f_get():Observable<any>{

    return this.http.get(this.base_url+'/get')
  }

  f_post(req_body : any):Observable<any>{

    return this.http.post(this.base_url+'/post',req_body);
  
  }
 



}