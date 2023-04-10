import { Injectable,EventEmitter } from '@angular/core';

import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketWebServerService {
  callback : EventEmitter<any> = new EventEmitter();
  socketResponse :EventEmitter<any> = new EventEmitter();

  htmlResponse :EventEmitter<any> = new EventEmitter();

  hostname = window.location.hostname;
  
  devURL:string = `http://${this.hostname}:3000`;
  productURL:string = `https://dwbkyuth-production.up.railway.app`;

  server_url:string= this.productURL;

  io = io(this.server_url,{
    withCredentials:true,
    autoConnect: false,
  }) 


  constructor() { 

    this.connection();
<<<<<<< HEAD
    this.OnJoinedRoomProject();
    this.OnsocketNewClient();

    this.onEditedHTMLProject();
=======
    this.OnsocketNewClient();
>>>>>>> ff2b915 (services/integration/testconexion)
  }

  connection(){

<<<<<<< HEAD
    this.io.io.opts.query = {message:"CONNECTION SUCCESS"}
=======
    this.io.io.opts.query = {room:"CONEXION REALIZADA CON EXITO"}
>>>>>>> ff2b915 (services/integration/testconexion)
    this.io.connect();

  }

<<<<<<< HEAD
  joinRoomProject(idRoom:string){
    this.io.emit("JoinRoomProject",idRoom);
  }

  OnJoinedRoomProject(){
    this.io.on("JoinedRoomProject", res => this.socketResponse.emit(res));
  }

  goEditingHTMLProject(idRoom:string,html:string){
    this.io.emit("EditingHTMLProject",{idRoom,html});
  }
  onEditedHTMLProject(){
    this.io.on("EditedHTMLProject", res => this.htmlResponse.emit(res));
  }

=======
>>>>>>> ff2b915 (services/integration/testconexion)
  _socketNewApplicationClient(){
    this.io.emit("NewApplicationClient");
  }
  
  OnsocketNewClient = () =>{
    this.io.on("NewClient", res => this.callback.emit(res));
  }

}
