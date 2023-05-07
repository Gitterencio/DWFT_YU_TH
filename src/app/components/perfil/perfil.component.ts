import { Component ,ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import {LocalStorageService} from 'src/app/services/local-storage.service';
import {NestBackendService} from 'src/app/services/nest-backend.service';

import {Proyectos} from "dw-data-types/interfaces/proyectos.interface"
import {Invitaciones} from 'dw-data-types/interfaces/invitaciones.interface';

import { UpdateEstadoInvitacionDTO } from 'dw-data-types/dto/invitaciones.dto';
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
  @ViewChild ('newInvitacionModal') newInvitacionModal:any;

  verProyectos:Boolean = false
  verMisInvitaciones:Boolean = false
  verInvitacionesProyectos:Boolean = false

  proyectosList?:Proyectos[]
  misInvitacionesList?:Invitaciones[]
  invitacionesProyectosList?:Invitaciones[]

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
    this._nestserver.getUserInvitaciones().subscribe(data =>{
      console.log(data.message)
      
      this.misInvitacionesList = data.invitaciones
      

    },err => {
       console.log(err.error)
       
       if(!this._localstorage._getStringLocalStorege("access_token")){
        this._router.navigate(['sign-in'])
       }

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

  getInvitacionesProyectos(){
    this.ocultarListas();
    this.verInvitacionesProyectos = true
    this._nestserver.getInvitadoInvitaciones().subscribe(data =>{
      console.log(data.message)
      
      this.invitacionesProyectosList = data.invitaciones
      

    },err => {
       console.log(err.error)
       
       if(!this._localstorage._getStringLocalStorege("access_token")){
        this._router.navigate(['sign-in'])
       }

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

  getUserProyectos(){
    this.ocultarListas();

    this.verProyectos=true;
    this._nestserver.getUserProyectos().subscribe(data =>{
      console.log(data.message)
      
      this.proyectosList = data.proyectos
    
      

    },err => {
       console.log(err.error)
       
       if(!this._localstorage._getStringLocalStorege("access_token")){
        this._router.navigate(['sign-in'])
       }

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




  goToScriptProyecto(id:string){
    this._localstorage._setLocalStorege('proyectoId',id)
    this._router.navigate(['workspace'])
  }

    //MODAL
    openNewProyectoModal(){
      this._ngbModal.open(this.newProyectoModal, {size: '0'});
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


//MODAL
  openNewInvitacionModal(){
    this._ngbModal.open(this.newInvitacionModal, {size: '0'});
  }

  onSubmitNewInvitacion(newInvitacionForm: NgForm) {
    console.log(newInvitacionForm.valid);
    if(!newInvitacionForm.valid){
      Swal.fire(
        'Atencion!',
        'Complete el formulario',
        'warning',
      );
    }else{
      this._nestserver.createNewInvitacion(newInvitacionForm.value).subscribe(data =>{
        Swal.fire({
          title: 'Invitacion Enviada',
          text: data.message,
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this._ngbModal.dismissAll(this.newInvitacionModal);
            this.getMisInvitaciones();
      
          }
        });

      },err => {
         console.log(err.error)
         Swal.fire(
          'Atencion!',
          err.error.message ,
          'error',
        );
        this._router.navigate(['profile'])
         
      }) 
    }
  
  }

  updateEstadoInvitacion(id:string,estado:'espera'|'aceptada'|'rechazada'|'cancelada'){
    let update:UpdateEstadoInvitacionDTO=
    {
      id,
      estado
    }
    this._nestserver.updateEstadoInvitacion(update).subscribe(data =>{
      Swal.fire({
        title: 'Invitacion '+estado,
        text: data.message,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          if (estado!= 'cancelada'){
            this.getInvitacionesProyectos();
          }else{
            this.getMisInvitaciones();
          }
       
        
        }
      });

    },err => {
       console.log(err.error)
       Swal.fire(
        'Atencion!',
        err.error.message ,
        'error',
      );
      this._router.navigate(['profile'])
       
    }) 
  }

  getName(inv:Invitaciones){
    let name:string = ''
    this.proyectosList?.filter(item => {
      if (item._id === inv.proyecto){
        name = item.name
      }
    })
    return name
  }
  signOut(){
 
    this._localstorage._clearLocalStorege()
    this._router.navigate(['sign-in'])
  }

}
