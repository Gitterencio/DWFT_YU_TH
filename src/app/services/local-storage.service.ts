import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  _setDataLocalStorege(key: string, data: any) //data = {atributo:valor}
  {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    }
    catch (e) {
      console.log(e);
    }
  }

  _getDataLocalStorege(key: string) {
    try {
      let data = localStorage.getItem(key) || false;


      if (data) {
        return JSON.parse(data);
      }
      else{
        return data;
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  _getStringLocalStorege(key: string) {
    try {
    
      return localStorage.getItem(key) || false;
    }
    catch (e) {
      console.log(e)
      return false;
    }
  }

  _getNumberLocalStorege(key: string) {
    try {
      let data = localStorage.getItem(key) || false;

      if (data) {
        return Number(data);
      }
      else{
        return 0;
    }
    }
    catch (e) {
      console.log(e)
      return 0;
    }
  }

  _setLocalStorege(key: string, data:string|number) 
  {
    try {
      localStorage.setItem(key, data.toString() );
    }
    catch (e) {
      console.log(e);
    }
  }

  _removeLocalStorege(key: string) {
    localStorage.removeItem(key);

  }

  _clearLocalStorege() {
    localStorage.clear();

  }
}
