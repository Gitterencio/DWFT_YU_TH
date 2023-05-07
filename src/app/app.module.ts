import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PreciosComponent } from './components/precios/precios.component';
import { FAQComponent } from './components/faq/faq.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { TestComponent } from './components/test/test.component';

//INTEGRANCION NESTJS BACKEND
import {HttpClientModule} from '@angular/common/http';
//FORMULARIO REACTIVO
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NavwsComponent } from './components/navws/navws.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PreciosComponent,
    FAQComponent,
    SignInComponent,
    SignUpComponent,
    PerfilComponent,
    WorkspaceComponent,
    TestComponent,
    NavwsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
        //INTEGRANCION EXPRESS BACKEND
        HttpClientModule,
        //FORMULARIO REACTIVO
        FormsModule,
        ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
