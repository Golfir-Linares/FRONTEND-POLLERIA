import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';
import { PolloService } from 'src/app/Servicios/carta/pollo.service';

@Component({
  selector: 'app-pollos',
  templateUrl: './pollos.component.html',
  styleUrls: ['./pollos.component.css']
})
export class PollosComponent implements OnInit {
  
  pollo:CartaI []=[];

  constructor(private api:PolloService, private carritoService:CarritoService, private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.api.getAllPollo()
    .subscribe(rs => {
      console.log(rs);
      this.pollo=rs
    })
  }

  addCarta(id: string){
    this.carritoService.addCarta(id);
  }

}
