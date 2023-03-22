import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartaI } from 'src/app/Modelos/carta.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  private url:string = "http://localhost:3500"
  cartas: string[] = [];

  constructor(private http:HttpClient) {
    const cartasString = localStorage.getItem('idCarta');
    if (cartasString) {
      this.cartas = JSON.parse(cartasString);
    }
   }

  addCarta(id: string){
    if (!this.cartas.includes(id)) {
      this.cartas.push(id.toString())
      localStorage.setItem('idCarta', JSON.stringify(this.cartas))
    }
  }

  removeCarta(id: string){
    const index = this.cartas.indexOf(id);
    if (index >= 0) {
      this.cartas.splice(index, 1);
      localStorage.setItem('idCarta', JSON.stringify(this.cartas));
    }
  }

  getAllCarrito(dataMap: any){
    const url: string = `${this.url}/carta/getCartsByIds`;
    return this.http.post<CartaI[]>(url, {dataMap})
  }

}
