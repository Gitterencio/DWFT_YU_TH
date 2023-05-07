import { Injectable,EventEmitter } from '@angular/core';
import { Proyectos } from 'dw-data-types/interfaces/proyectos.interface';

import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketWebServerService {
  callback : EventEmitter<any> = new EventEmitter();

  socketJoinedRoomProject :EventEmitter<any> = new EventEmitter();
  socketActualEditingProject :EventEmitter<any> = new EventEmitter();
  socketHTMLEdited :EventEmitter<any> = new EventEmitter();
  socketCSSEdited :EventEmitter<any> = new EventEmitter();
  socketJSEdited :EventEmitter<any> = new EventEmitter();


  htmlResponse :EventEmitter<any> = new EventEmitter();

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
    this.OnActualEditingProject();
    this.OnHTMLProjectEdited();
    this.OnCSSProjectEdited();
    this.OnJSProjectEdited();

    this.OnsocketNewClient();

    this.onEditedHTMLProject();
  }

  connection(){

    this.io.io.opts.query = {message:"CONNECTION SUCCESS"}
    this.io.connect();

  }

  joinRoomProject(idRoom:string){
    this.io.emit("JoinRoomProject",idRoom);
  }

  OnJoinedRoomProject(){
    this.io.on("JoinedRoomProject", res => this.socketJoinedRoomProject.emit(res));
  }

  goActualEditingProject(idRoom:string,proyecto:Proyectos){
    this.io.emit("SetActualEditingProject",{idRoom,proyecto});
  }

  OnActualEditingProject(){
    this.io.on("ActualEditingProject", res => this.socketActualEditingProject.emit(res));
  }
  
  goEditHTMLProject(idRoom:string,html:string){
    this.io.emit("HTMLProjectEditing",{idRoom,html});
  }

  OnHTMLProjectEdited(){
    this.io.on("HTMLProjectEdited", res => this.socketHTMLEdited.emit(res));
  }

  goEditCSSProject(idRoom:string,css:string){
    this.io.emit("CSSProjectEditing",{idRoom,css});
  }

  OnCSSProjectEdited(){
    this.io.on("CSSProjectEdited", res => this.socketCSSEdited.emit(res));
  }

  goEditJSProject(idRoom:string,js:string){
    this.io.emit("JSProjectEditing",{idRoom,js});
  }

  OnJSProjectEdited(){
    this.io.on("JSProjectEdited", res => this.socketJSEdited.emit(res));
  }

  goEditingHTMLProject(idRoom:string,html:string){
    this.io.emit("EditingHTMLProject",{idRoom,html});
  }
  onEditedHTMLProject(){
    this.io.on("EditedHTMLProject", res => this.htmlResponse.emit(res));
  }

  _socketNewApplicationClient(){
    this.io.emit("NewApplicationClient");
  }
  
  OnsocketNewClient = () =>{
    this.io.on("NewClient", res => this.callback.emit(res));
  }

}
