import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import {LocalStorageService} from 'src/app/services/local-storage.service';
import {NestBackendService} from 'src/app/services/nest-backend.service';
import {SocketWebServerService} from 'src/app/services/socket-web-server.service';

import {CreateUserDTO,LoginIdUserDTO} from 'dw-data-types/dto/users.dto';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
   //HABILITAR CSS
   encapsulation:ViewEncapsulation.None,
})
export class TestComponent {
  datos = {
    mensaje: 'HOLA ANGULAR',
    b_mensaje: '',
    ab_mensaje: '',
  }

  user:LoginIdUserDTO ={
    id:"6430ba56fe10ebe615015894",
    password:"12323"
  };

  UserLog = {
    user: '',
    asesor: false,
    pass: ''
  }

  html_edit:string = '';

  constructor(
    protected _socket: SocketWebServerService, 
    protected _nestserver: NestBackendService, 
    protected _router: Router, 
    protected _localstorage: LocalStorageService) { }

    ngOnInit(): void {
      
      
      this._socketTest();
      this._getNest();
      this.OnsocketListen();

      this.goJoinRoomProject();
      this.onSocketResponse();

<<<<<<< HEAD
      this.on_html_edited();

=======
>>>>>>> a20b171 (join room)
    }

    goJoinRoomProject(){
      this._socket.joinRoomProject('IDASADASDSADASDS');
    };

    onSocketResponse(){
      this._socket.socketResponse.subscribe(res =>{
        console.log(res)
      });
    }
  
    _socketTest(){
      //ENVIA
      this._socket._socketNewApplicationClient();
    };
  
    OnsocketListen(){
      //ESCUCHA
      this._socket.callback.subscribe(res =>{      
        console.log(res)
        this._postNest();
        
        })
    };
  
    _getNest (){
      this._nestserver.f_get().subscribe(data =>{
        console.log(data.mensaje)
        this.datos.b_mensaje = data.mensaje;
      })
    };
  
    _postNest (){
      this._nestserver.f_post({mensaje:'HOLA SOY EL FRONTEND'}).subscribe(data =>{
        console.log(data.mensaje)
        this.datos.ab_mensaje = data.mensaje;
      })
    }

    cambio(){
      console.log(this.UserLog)
    }

    html_editing(){
      console.log('EDITING HTML')
      document.getElementById('general')?.setAttribute('srcdoc',this.html_edit);
      this._socket.goEditingHTMLProject('IDASADASDSADASDS',this.html_edit)
    }

    on_html_edited(){
      this._socket.htmlResponse.subscribe(html =>{
        console.log('probar broadcast')
        this.html_edit = html
        document.getElementById('general')?.setAttribute('srcdoc',html);
      });
    }
  
  }
  