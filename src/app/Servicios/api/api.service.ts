import { Injectable } from '@angular/core';
import { LoginI } from '../../Modelos/login.interface';
import { ResponseI } from '../../Modelos/response.interface';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = "http://localhost:3500";

  constructor( private http:HttpClient) { }

  loginByEmail(form:LoginI){
    const direccion: string = `${this.url}/users/signin`;
    return this.http.post<ResponseI>(direccion,form);
  }

}
