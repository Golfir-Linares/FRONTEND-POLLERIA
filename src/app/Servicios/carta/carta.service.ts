import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartaI } from 'src/app/Modelos/carta.interface';

@Injectable({
  providedIn: 'root'
})
export class CartaService {
  
  private url:string = "https://a-osrestapi-production.up.railway.app"

  constructor(private http:HttpClient) { }

  getAll(componente: string){
    const direccion: string = `${this.url}/carta/getCartByCategory/`+componente;
    return this.http.get<CartaI[]>(direccion)
  }
}