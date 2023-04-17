import { Component } from '@angular/core';
import { CategoI } from 'src/app/Modelos/categoria.interface';
import { CategoriaService } from 'src/app/Servicios/categoria/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  menu:CategoI [] = [];

  constructor(private api:CategoriaService, private router:Router){}
  
  ngOnInit():void{
    this.api.getAllCategoria()
      .subscribe(rs => {
        this.menu=rs
      })
  }
}
