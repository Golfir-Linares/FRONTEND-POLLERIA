import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  
  dataCarta: CartaI[] = [];

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit(): void {
    this.getCarrito();
  }

  removeCarta(id: string){
    this.carritoService.removeCarta(id);
    this.getCarrito();
  }

  getCarrito(){
    // Obtener la cadena de texto del localStorage
    const cartasIdString = localStorage.getItem('idCarta') || '[]';    ;
    // Convertir la cadena de texto a un JSON
    const cartasIdArray = JSON.parse(cartasIdString);
    this.carritoService.getAllCarrito(cartasIdArray).subscribe((rs) => {
      this.dataCarta = rs;
    });
  }
  
}
