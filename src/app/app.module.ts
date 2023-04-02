import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PreciosComponent } from './components/precios/precios.component';
import { FAQComponent } from './components/faq/faq.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PreciosComponent,
    FAQComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component:HomeComponent},
      {path: 'precios', component:PreciosComponent},
      {path: 'faq', component:FAQComponent},
      {path: 'sign-in', component:SignInComponent},
      {path: 'sign-up', component:SignUpComponent},
      {path: '**', redirectTo:'/', pathMatch:'full'} //Ruta comodín, En caso de tipear mal la dirección esto hará que nos dirija a la página raíz. El pathMath es para que la coicidencia sea total en cuanto a lo que se escribe.

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
