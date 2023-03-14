import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './Vistas/categoria/categoria.component';
import { LoginComponent } from './Vistas/login/login.component'
import { SingupComponent } from './Vistas/singup/singup.component'
import { MenuComponent } from './Vistas/menu/menu.component';
import { ConfirmComponent } from './Vistas/confirm/confirm.component';
import { ForgetpassComponent } from './Vistas/forgetpass/forgetpass.component';
import { ChangepassComponent } from './Vistas/changepass/changepass.component';
import { EnsaladasComponent } from './Vistas/cartas/ensaladas/ensaladas.component';
import { PollosComponent } from './Vistas/cartas/pollos/pollos.component';
import { PromocionesComponent } from './Vistas/cartas/promociones/promociones.component';
import { SaltadosComponent } from './Vistas/cartas/saltados/saltados.component';
import { ChaufaComponent } from './Vistas/cartas/chaufa/chaufa.component';


const routes: Routes = [

  {path:'' , redirectTo:'menu', pathMatch:'full'},
  {path: 'menu', component:MenuComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:SingupComponent},
  {path: 'recover', component:ForgetpassComponent},
  {path: 'categoria', component:CategoriaComponent},
  {path: 'carta/Ensaladas',component:EnsaladasComponent},
  {path: 'carta/Chaufas',component:ChaufaComponent}, 
  {path: 'carta/Pollos',component:PollosComponent},
  {path: 'carta/Promociones',component:PromocionesComponent},
  {path: 'carta/Saltados',component:SaltadosComponent},
  {path: 'confirm/:user_token', component: ConfirmComponent },
  {path: 'verify/:new_user_token', component: ChangepassComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,SingupComponent,MenuComponent]
