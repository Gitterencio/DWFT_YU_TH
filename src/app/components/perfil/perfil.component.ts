import { Component ,ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {LocalStorageService} from 'src/app/services/local-storage.service';
import {NestBackendService} from 'src/app/services/nest-backend.service';

import {Proyectos} from "dw-data-types/interfaces/proyectos.interface"

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor(private _ngbModal: NgbModal,
    private _nestserver: NestBackendService, 
    private _router: Router, 
    private _localstorage: LocalStorageService) {}

  @ViewChild ('newProyectoModal') newProyectoModal:any;

  verProyectos:Boolean = false
  verMisInvitaciones:Boolean = false
  verInvitacionesProyectos:Boolean = false

  proyectosList?:Proyectos[]

  ngOnInit(): void {

    this.getUserProyectos();
  }

  ocultarListas(){
    this.verProyectos = false
    this.verMisInvitaciones = false
    this.verInvitacionesProyectos = false
  }

  getMisInvitaciones(){
    this.ocultarListas();
    this.verMisInvitaciones = true
  }

  getInvitacionesProyectos(){
    this.ocultarListas();
    this.verInvitacionesProyectos = true
  }

  getUserProyectos(){
    this.ocultarListas();

    this.verProyectos=true;
    this._nestserver.getUserProyectos().subscribe(data =>{
      console.log(data.message)
      
      this.proyectosList = data.proyectos
      

    },err => {
       console.log(err.error)

       if(err.error.statusCode === 401){
       Swal.fire(
        'Atencion!',
        err.error.message ,
        'error',
      ).then((result) => {
        if (result.isConfirmed) {
          this._localstorage._clearLocalStorege();
          this._router.navigate(['sign-in'])
        }
      });

    }
       
    }) 

  }

  openNewProyectoModal(){
    this._ngbModal.open(this.newProyectoModal, {size: '0'});
  }


  goToScriptProyecto(id:string){
    this._localstorage._setLocalStorege('proyectoId',id)
    this._router.navigate(['workspace'])
  }
  onSubmitNewProyecto(newProyectoForm: NgForm) {
    console.log(newProyectoForm.valid);

    if(!newProyectoForm.valid){
      Swal.fire(
        'Atencion!',
        'Complete el formulario',
        'warning',
      );
    }else{
     
      this._nestserver.createNewProyecto(newProyectoForm.value).subscribe(data =>{
        Swal.fire({
          title: 'Proyecto Creado',
          text: data.message,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this._ngbModal.dismissAll(this.newProyectoModal);
            this.getUserProyectos();
            console.log(data.proyecto)
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

  signOut(){
 
    this._localstorage._clearLocalStorege()
    this._router.navigate(['sign-in'])
  }

}
