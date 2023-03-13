import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartaI } from 'src/app/Modelos/carta.interface';

@Injectable({
  providedIn: 'root'
})
export class EnsaladaService {
  private url:string = "http://localhost:3500"

  constructor(private http:HttpClient) { }

  getAllEnsalada(){
    const direccion: string = `${this.url}/carta/getCartByCategory/Ensaladas`;
    return this.http.get<CartaI[]>(direccion)
  }
}
