import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proyectos } from 'dw-data-types/interfaces/proyectos.interface';
import {LocalStorageService} from 'src/app/services/local-storage.service';
import {NestBackendService} from 'src/app/services/nest-backend.service';
import {SocketWebServerService} from 'src/app/services/socket-web-server.service';
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

  html_edit:string = `<h1>Hola mundo</h1>`;
  css_edit:string = `h1{color:red;}`;
  js_edit:string = `console.log('hola mundo')`;
  //this._localstorage._setLocalStorege('editingProyecto',id)

  preview:string =`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        ${this.css_edit}
      </style>
    </head>
    <body>
      <script>
        ${this.js_edit}
      </script>
      ${this.html_edit}
    </body>
  </html>

  `


  ngOnInit(): void {
    this.getEditingProyecto();
    this.inicializarPreview();
  }

  getEditingProyecto(){
    this.editingProyecto = this._localstorage._getDataLocalStorege('editingProyecto')

    if(!this.editingProyecto){
      const proyectoId = this._localstorage._getStringLocalStorege('proyectoId')
      
      if(!proyectoId){
        //this._router.navigate(['perfil'])
      }
      this._nestserver.getEditingProyectos().subscribe(data =>{
      
        console.log(data.message)
        this.editingProyecto = data.proyecto
        this._localstorage._setDataLocalStorege('editingProyecto',this.editingProyecto)
        console.log(data.message,this.editingProyecto?.html_text
          )
  
      },err => {
         console.log(err.error)
         
      })
    }
  }


  inicializarPreview(){
    document.getElementById('preview')?.setAttribute('srcdoc',this.preview);
  }
  onChangeCode(){
    this.preview =`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          ${this.css_edit}
        </style>
      </head>
      <body>
        <script>
          ${this.js_edit}
        </script>
        ${this.html_edit}
      </body>
    </html>
  
    `
    document.getElementById('preview')?.setAttribute('srcdoc',this.preview);
  }
  
}
