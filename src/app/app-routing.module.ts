import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FAQComponent } from './components/faq/faq.component';
import { PreciosComponent } from './components/precios/precios.component';
import { HomeComponent } from './components/home/home.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';

//COMPONENTE DE PRUEBA
import {TestComponent}  from './components/test/test.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'precios', component: PreciosComponent },
  { path: 'faq', component: FAQComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'workspace', component: WorkspaceComponent },
  {path:'test' ,component: TestComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
