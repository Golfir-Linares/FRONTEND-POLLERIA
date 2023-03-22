import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';
import { PromocionesService } from 'src/app/Servicios/carta/promociones.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {

  promociones:CartaI []=[];

  constructor(private api:PromocionesService, private carritoService:CarritoService, private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  
  ngOnInit(): void {
    this.api.getAllPromociones()
    .subscribe(rs =>{
      console.log(rs);
      this.promociones=rs
    })
  }

  addCarta(id: string){
    this.carritoService.addCarta(id);
  }

}
