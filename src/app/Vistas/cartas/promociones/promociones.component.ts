import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { PromocionesService } from 'src/app/Servicios/carta/promociones.service';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
  promociones:CartaI []=[];

  constructor(private api:PromocionesService, private router:Router){}
  
  ngOnInit(): void {
    this.api.getAllPromociones()
    .subscribe(rs =>{
      console.log(rs);
      this.promociones=rs
    })
  }

}


