import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';
import { ChaufasService } from 'src/app/Servicios/carta/chaufas.service';

@Component({
  selector: 'app-chaufa',
  templateUrl: './chaufa.component.html',
  styleUrls: ['./chaufa.component.css']
})
export class ChaufaComponent implements OnInit {

  chaufa:CartaI []=[];

  constructor(private api:ChaufasService, private carritoService:CarritoService, private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.api.getAllChaufa()
    .subscribe(rs =>{
      console.log(rs);
      this.chaufa=rs
    })
  }

  addCarta(id: string){
    this.carritoService.addCarta(id);
  }

}
