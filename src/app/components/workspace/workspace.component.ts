import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proyectos } from 'dw-data-types/interfaces/proyectos.interface';
import {LocalStorageService} from 'src/app/services/local-storage.service';
import {NestBackendService} from 'src/app/services/nest-backend.service';
import {SocketWebServerService} from 'src/app/services/socket-web-server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {
  constructor(
    private _socket: SocketWebServerService, 
    private _nestserver: NestBackendService, 
    private _router: Router, 
    private _localstorage: LocalStorageService) { }


  editingProyecto?:Proyectos

  //this._localstorage._setLocalStorege('editingProyecto',id)

  preview:string =`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
     
      </style>
    </head>
    <body>
      <script>
        
      </script>
    
    </body>
  </html>

  `


  ngOnInit(): void {
    this.getEditingProyecto();
    this.inicializarPreview();
  }

  getEditingProyecto(){
    const proyectoId = this._localstorage._getStringLocalStorege('proyectoId')
    if(!proyectoId){
      this._router.navigate(['perfil'])
    }

    this.editingProyecto = this._localstorage._getDataLocalStorege('editingProyecto')
    if(!this.editingProyecto){  
      this._nestserver.getEditingProyectos().subscribe(data =>{
        console.log(data.message)
        this.editingProyecto = data.proyecto
        this._localstorage._setDataLocalStorege('editingProyecto',this.editingProyecto)
        console.log(data.message,this.editingProyecto?.html_text)
  
      },err => {
         console.log(err.error)
        
      })
    }

    else{
      if (this.editingProyecto._id != proyectoId){
        this.saveEditingProyecto();
        this._localstorage._removeLocalStorege('editingProyecto')
        this.getEditingProyecto();
        
      }
    } 
    
  }

  saveEditingProyecto(){

    if (this.editingProyecto){
    this._nestserver.saveEditingProyecto(this.editingProyecto).subscribe(data =>{
      console.log(data.message)
      Swal.fire({
        title: 'Proyecto En Memoria',
        text: data.message,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK'
      })

    },err => {
       console.log(err.error)
       Swal.fire(
        'Atencion!',
        err.error.message ,
        'error',
      )

      if(err.error.statusCode === 401){
           this._router.navigate(['sign-in'])
     }
    })
  }
  }

  inicializarPreview(){
    document.getElementById('preview')?.setAttribute('srcdoc',this.preview);
  }

  onChangeCodeHTML(){
    console.log('html')
    this.onChangeCode();
  }

  onChangeCodeJS(){
    console.log('js')
    this.onChangeCode();
  }


  onChangeCodeCSS(){
    console.log('css')
    this.onChangeCode();
  }

  onChangeCode(){
    this.preview =`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          ${this.editingProyecto?.css_text}
        </style>
      </head>
      <body>
      ${this.editingProyecto?.html_text}
        <script>
          ${this.editingProyecto?.js_text}
        </script>
      </body>
    </html>
  
    `
    //rendirizar
    document.getElementById('preview')?.setAttribute('srcdoc',this.preview);
    //guardado local
    this._localstorage._setDataLocalStorege('editingProyecto',this.editingProyecto)
  }
  
  signOut(){
 
    this._localstorage._clearLocalStorege()
    this._router.navigate(['sign-in'])
  }
}
