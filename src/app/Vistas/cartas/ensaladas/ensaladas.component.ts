import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { EnsaladaService } from 'src/app/Servicios/carta/ensalada.service';

@Component({
  selector: 'app-ensaladas',
  templateUrl: './ensaladas.component.html',
  styleUrls: ['./ensaladas.component.css']
})
export class EnsaladasComponent implements OnInit {
  ensalada:CartaI[]=[];

  constructor(private api:EnsaladaService, private router:Router){}

  ngOnInit(): void {
    this.api.getAllEnsalada()
    .subscribe(rs =>{
      console.log(rs);
      this.ensalada=rs
    })
  }

}
