import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { SaltadosService } from 'src/app/Servicios/carta/saltados.service';

@Component({
  selector: 'app-saltados',
  templateUrl: './saltados.component.html',
  styleUrls: ['./saltados.component.css']
})
export class SaltadosComponent implements OnInit {
  saltado:CartaI []=[];

  constructor(private api:SaltadosService, private router:Router){}

  ngOnInit(): void {
    this.api.getAllSaltados()
    .subscribe(rs =>{
      console.log(rs);
      this.saltado=rs
    })
  }


}
