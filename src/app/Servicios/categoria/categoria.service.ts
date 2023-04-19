import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoI } from 'src/app/Modelos/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url:string = "https://a-osrestapi-production.up.railway.app";

  constructor(private http:HttpClient) { }

  getAllCategoria(){
    const direccion: string = `${this.url}/category/getCategories`;
    return this.http.get<CategoI[]>(direccion);
  }
}

