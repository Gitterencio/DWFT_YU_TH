import { Injectable,EventEmitter } from '@angular/core';

import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketWebServerService {
  callback : EventEmitter<any> = new EventEmitter();
  socketResponse :EventEmitter<any> = new EventEmitter();
  hostname = window.location.hostname;
  
  devURL:string = `http://${this.hostname}:3000`;
  productURL:string = `https://dwbkyuth-production.up.railway.app`;

  server_url:string= this.devURL;

  io = io(this.server_url,{
    withCredentials:true,
    autoConnect: false,
  }) 


  constructor() { 

    this.connection();
    this.OnJoinedRoomProject();
    this.OnsocketNewClient();
  }

  connection(){

    this.io.io.opts.query = {message:"CONNECTION SUCCESS"}
    this.io.connect();

  }

  joinRoomProject(idRoom:string){
    this.io.emit("JoinRoomProject",idRoom);
  }

  OnJoinedRoomProject(){
    this.io.on("JoinedRoomProject", res => this.socketResponse.emit(res));
  }

  _socketNewApplicationClient(){
    this.io.emit("NewApplicationClient");
  }
  
  OnsocketNewClient = () =>{
    this.io.on("NewClient", res => this.callback.emit(res));
  }

}
