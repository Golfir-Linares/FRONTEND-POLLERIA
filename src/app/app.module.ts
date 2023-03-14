import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';

import { ReactiveFormsModule, FormsModule } from  '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { CategoriaComponent } from './Vistas/categoria/categoria.component'
//import { LoginComponent } from './Vistas/login/login.component';
//import { MenuComponent } from './Vistas/menu/menu.component';
//import { SingupComponent } from './Vistas/singup/singup.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmComponent } from './Vistas/confirm/confirm.component';
import { ForgetpassComponent } from './Vistas/forgetpass/forgetpass.component';
import { ChangepassComponent } from './Vistas/changepass/changepass.component';
import { filterPipe } from './Pipe/filter.pipe';
import { EnsaladasComponent } from './Vistas/cartas/ensaladas/ensaladas.component';
import { SaltadosComponent } from './Vistas/cartas/saltados/saltados.component';
import { PollosComponent } from './Vistas/cartas/pollos/pollos.component';
import { PromocionesComponent } from './Vistas/cartas/promociones/promociones.component';
import { ChaufaComponent } from './Vistas/cartas/chaufa/chaufa.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    filterPipe,
    routingComponents,
    CategoriaComponent,
    ConfirmComponent,
    ForgetpassComponent,
    ChangepassComponent,
    EnsaladasComponent,
    SaltadosComponent,
    PollosComponent,
    PromocionesComponent,
    ChaufaComponent
    //SingupComponent
    //LoginComponent,
    //MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
