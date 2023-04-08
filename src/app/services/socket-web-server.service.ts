import { Injectable,EventEmitter } from '@angular/core';

import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketWebServerService {
  callback : EventEmitter<any> = new EventEmitter();

  hostname = window.location.hostname;
  
  devURL:string = `http://${this.hostname}:3000`;
  productURL:string = ``;

  server_url:string= this.devURL;

  io = io(this.server_url,{
    withCredentials:true,
    autoConnect: false,
  }) 


  constructor() { 

    this.connection();
    this.OnsocketNewClient();
  }

  connection(){

    this.io.io.opts.query = {room:"CONEXION REALIZADA CON EXITO"}
    this.io.connect();

  }

  _socketNewApplicationClient(){
    this.io.emit("NewApplicationClient");
  }
  
  OnsocketNewClient = () =>{
    this.io.on("NewClient", res => this.callback.emit(res));
  }

}
