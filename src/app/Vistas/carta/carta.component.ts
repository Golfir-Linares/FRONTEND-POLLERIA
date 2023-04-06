import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';
import { CartaService } from 'src/app/Servicios/carta/carta.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit{

  token: string = "";
  carta: CartaI[] = [];
  categoria: any;

  constructor(private api:CartaService, private carritoService:CarritoService, private route: ActivatedRoute, private router:Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    this.getAllCarta(this.categoria);
  }

  getAllCarta(carta: string){
    this.api.getAll(carta)
    .subscribe(rs =>{
      console.log(rs);
      this.carta=rs
    })
  }

  addCarta(id: string){
    this.carritoService.addCarta(id);
  }

}
