import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileInterface } from 'src/app/Modelos/auth.interface';
import { AuthResponse} from '../../Modelos/auth.interface'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = "http://localhost:3500";

  constructor( private http:HttpClient) { }

  login( email: string, password: string ){
    const url: string = `${this.url}/users/signin`;
    return this.http.post<AuthResponse>(url,{ email, password })
  }

  getProfile(token: string): Observable<ProfileInterface>{
    const url: string = `${this.url}/users/perfil`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProfileInterface>(url, { headers: headers });
  }
  

}
