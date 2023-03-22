import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';
import { EnsaladaService } from 'src/app/Servicios/carta/ensalada.service';

@Component({
  selector: 'app-ensaladas',
  templateUrl: './ensaladas.component.html',
  styleUrls: ['./ensaladas.component.css']
})
export class EnsaladasComponent implements OnInit {

  ensalada:CartaI[]=[];

  constructor(private api:EnsaladaService, private carritoService:CarritoService, private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.api.getAllEnsalada()
    .subscribe(rs =>{
      console.log(rs);
      this.ensalada=rs
    })
  }

  addCarta(id: string){
    this.carritoService.addCarta(id);
  }

}
