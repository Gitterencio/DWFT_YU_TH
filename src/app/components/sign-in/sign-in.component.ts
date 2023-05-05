import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {LocalStorageService} from 'src/app/services/local-storage.service';
import {NestBackendService} from 'src/app/services/nest-backend.service';
import {SocketWebServerService} from 'src/app/services/socket-web-server.service';

import { LoginEmailUserDTO } from 'dw-data-types/dto/users.dto';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(
    private _socket: SocketWebServerService, 
    private _nestserver: NestBackendService, 
    private _router: Router, 
    private _localstorage: LocalStorageService) { }

    onSubmitSingUp(signInForm: NgForm) {
      console.log(signInForm.valid);
  
      if(!signInForm.valid){
        Swal.fire(
          'Atencion!',
          'Complete el formulario',
          'warning',
        );
      }else{
        let loginUser:LoginEmailUserDTO = signInForm.value
         this._nestserver.singInUser(loginUser).subscribe(data =>{
          Swal.fire({
            title: 'Usuario Autorizado',
            text: data.message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this._localstorage._setDataLocalStorege('access_token',data.access_token)
              this._router.navigate(['perfil'])
            }
          });
  
        },err => {
           console.log(err.error)
           Swal.fire(
            'Atencion!',
            err.error.message ,
            'error',
          );
           
        }) 
         
      }
      
    }
}
