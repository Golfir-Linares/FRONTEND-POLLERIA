import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';
import { SaltadosService } from 'src/app/Servicios/carta/saltados.service';

@Component({
  selector: 'app-saltados',
  templateUrl: './saltados.component.html',
  styleUrls: ['./saltados.component.css']
})
export class SaltadosComponent implements OnInit {
  
  saltado:CartaI []=[];

  constructor(private api:SaltadosService, private carritoService:CarritoService, private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.api.getAllSaltados()
    .subscribe(rs =>{
      console.log(rs);
      this.saltado=rs
    })
  }

  addCarta(id: string){
    this.carritoService.addCarta(id);
  }

}
