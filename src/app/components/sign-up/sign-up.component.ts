import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {LocalStorageService} from 'src/app/services/local-storage.service';
import {NestBackendService} from 'src/app/services/nest-backend.service';


import { CreateUserDTO } from 'dw-data-types/dto/users.dto';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {


  constructor(
    private _nestserver: NestBackendService, 
    private _router: Router, 
    private _localstorage: LocalStorageService) { }


  onSubmitSingUp(signUpForm: NgForm) {
    console.log(signUpForm.valid);

    if(!signUpForm.valid){
      Swal.fire(
        'Atencion!',
        'Complete el formulario',
        'warning',
      );
    }else{
      let newUser:CreateUserDTO = signUpForm.value
       this._nestserver.singUpUser(newUser).subscribe(data =>{
        Swal.fire({
          title: 'Usuario registrado',
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
          err.error.content,
          'error',
        );
         
      }) 
       
    }
    
  }
}
