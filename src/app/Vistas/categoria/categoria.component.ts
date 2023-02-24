import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/Servicios/categoria/categoria.service'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  constructor(private api:CategoriaService){}
  ngOnInit():void{
    this.api.getAllCategoria()
      .subscribe(rs => {
        console.log(rs);
      })
  }
}
