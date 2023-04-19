import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileInterface, RegisterData, SignupInterface, DocumentType, ConfirmResponse, ForgetPassResponse, VerifyRecoverTokenResponse, ChangePassResponse } from 'src/app/Modelos/auth.interface';
import { AuthResponse} from '../../Modelos/auth.interface'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url:string = "https://a-osrestapi-production.up.railway.app";

  constructor( private http:HttpClient) { }

  login(email: string, password: string){
    const url: string = `${this.url}/users/signin`;
    return this.http.post<AuthResponse>(url,{ email, password })
  }

  register(name: string, lastname: string, email: string, documentType: string, documentNumber: string, password: string){
    const url: string = `${this.url}/users/signup`;
    return this.http.post<SignupInterface>(url,{ name, lastname, documentType, documentNumber, email, password })
  }

  confirmUser(user_token: string) {
    const url:string = `${this.url}`+`/users/confirmed/`+user_token;
    return this.http.get<ConfirmResponse>(url);
  }

  recoverUser(email: string){
    const url: string = `${this.url}/users/olvidePassword`;
    return this.http.post<ForgetPassResponse>(url,{ email })
  }

  verifyUser(new_user_token: string) {
    const url:string = `${this.url}`+`/users/cambiarPassword/`+new_user_token;
    return this.http.get<VerifyRecoverTokenResponse>(url);
  }

  changePassword(password: string, new_user_token: string){
    const url:string = `${this.url}`+`/users/cambiarPassword/`+new_user_token;
    return this.http.put<ChangePassResponse>(url,{ password })
  }

  getProfile(token: string): Observable<ProfileInterface>{
    const url: string = `${this.url}/users/perfil`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<ProfileInterface>(url, { headers: headers });
  }

  getDocument(token: string):Observable<DocumentType[]>{
    const url: string = `${this.url}/documents/getDocTypes`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<DocumentType[]>(url,{ headers: headers});
  } 
  
  sendMail(destinatario: string, asunto: string, mensaje: string, link: string){
    const url: string = `${this.url}/mail/enviar-email`;
    return this.http.post(url,{ destinatario, asunto, mensaje, link })
  }

}
