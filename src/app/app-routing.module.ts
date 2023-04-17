import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './Vistas/categoria/categoria.component';
import { LoginComponent } from './Vistas/login/login.component'
import { SingupComponent } from './Vistas/singup/singup.component'
import { MenuComponent } from './Vistas/menu/menu.component';
import { ConfirmComponent } from './Vistas/confirm/confirm.component';
import { ForgetpassComponent } from './Vistas/forgetpass/forgetpass.component';
import { ChangepassComponent } from './Vistas/changepass/changepass.component';
import { CarritoComponent } from './Vistas/carrito/carrito.component';
import { CartaComponent } from './Vistas/carta/carta.component';
import { PerfilComponent } from './Vistas/perfil/perfil.component';
import { ContactoComponent } from './Vistas/contacto/contacto.component';
import { NosotrosComponent } from './Vistas/nosotros/nosotros.component';


const routes: Routes = [

  {path: '' , redirectTo:'menu', pathMatch:'full',},
  {path: 'menu', component:MenuComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:SingupComponent},
  {path: 'recover', component:ForgetpassComponent},
  {path: 'perfil', component:PerfilComponent},
  {path: 'categoria', component:CategoriaComponent},
  {path: 'carta/:categoria', component: CartaComponent},
  {path: 'confirm/:user_token', component: ConfirmComponent },
  {path: 'verify/:new_user_token', component: ChangepassComponent },
  {path: 'carrito', component:CarritoComponent},
  {path: 'contacto', component:ContactoComponent},
  {path: 'nosotros', component:NosotrosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,SingupComponent,MenuComponent]
