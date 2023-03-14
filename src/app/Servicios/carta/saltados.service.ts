import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartaI } from 'src/app/Modelos/carta.interface';

@Injectable({
  providedIn: 'root'
})
export class SaltadosService {
  private url:string = "http://localhost:3500"

  constructor(private http:HttpClient) { }

  getAllSaltados(){
    const direccion: string = `${this.url}/carta/getCartByCategory/Saltados`;
    return this.http.get<CartaI[]>(direccion)
  }
}
