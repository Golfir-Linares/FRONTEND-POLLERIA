import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoResponse } from 'src/app/Modelos/pedido.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';
import { CartaService } from 'src/app/Servicios/carta/carta.service';
import { ToastrService } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit{

  token: string = "";
  carta: CartaI[] = [];
  categoria: any;

  constructor(private api:CartaService, private carritoService:CarritoService, private route: ActivatedRoute, private router:Router, private toastr: ToastrService ){
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
      this.carta=rs
    })
  }

  addCarta(id: string, name: string){
    this.carritoService.addCarta(id);
    // Obtener la cadena de texto del localStorage
    const cartasIdString = localStorage.getItem('idCarta') || '[]';    ;
    // Convertir la cadena de texto a un JSON
    const cartasIdArray = JSON.parse(cartasIdString);
    this.carritoService.saveCarritoToUser(cartasIdArray, this.token).subscribe({next: (resp: CarritoResponse) => {
      this.toastr.info("Se ha añadido: "+name+" al carrito.", "Info");
    }});
  }

}
