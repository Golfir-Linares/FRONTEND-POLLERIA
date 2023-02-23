import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Vistas/login/login.component'
import { MenuComponent } from './Vistas/menu/menu.component';
import { CategoriaComponent } from './Vistas/categoria/categoria.component';

const routes: Routes = [

  {path:'' , redirectTo:'login', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'menu', component:MenuComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,MenuComponent]
