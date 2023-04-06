import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/Servicios/categoria/categoria.service';
import { CategoI } from 'src/app/Modelos/categoria.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria:CategoI [] = [];
  nombrecategoria:string=''
  filtercategoria?:string


  constructor(private api:CategoriaService, private router:Router){}
  ngOnInit():void{
    this.api.getAllCategoria()
      .subscribe(rs => {
        console.log(rs);
        this.categoria=rs
      })
  }
}
