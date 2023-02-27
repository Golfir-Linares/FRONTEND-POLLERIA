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
<<<<<<< HEAD
import { MainComponent } from './Vistas/main/main.component';
import { filterPipe } from './Pipe/filter.pipe';

=======
>>>>>>> 2f5c2ca3823ea2bae0827798ccd034deab811f0f


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    filterPipe,
    routingComponents,
    CategoriaComponent
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
