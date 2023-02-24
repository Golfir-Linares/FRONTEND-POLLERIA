import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './Vistas/categoria/categoria.component';
import { LoginComponent } from './Vistas/login/login.component'
import { MenuComponent } from './Vistas/menu/menu.component';


const routes: Routes = [

  {path:'' , redirectTo:'menu', pathMatch:'full'},
  {path: 'menu', component:MenuComponent},
  {path: 'login', component:LoginComponent},
  {path: 'categoria', component:CategoriaComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,MenuComponent]
