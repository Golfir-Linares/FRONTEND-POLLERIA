import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CartaPedido, FinalizedOrderResponse, Pedido, PedidoResponse } from 'src/app/Modelos/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private url:string = "https://a-osrestapi-production.up.railway.app"
  private urlCulqi:string = "https://secure.culqi.com/v2"
  cartas: string[] = [];

  constructor(private http:HttpClient) { }

  createOrderDetail(deliveryDate: Date, observation:string, saleType: string, data: CartaPedido[], token: string){
    const url: string = `${this.url}/orders/createOrderDetail`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user_token': `${token}`
    });
    return this.http.post<PedidoResponse>(url, {deliveryDate, observation, saleType, data}, {headers: headers})
  }

  get_token_culqi(data: any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer pk_test_bc0ebb8ccb3d5b11'
    });
    return this.http.post('https://secure.culqi.com/v2/tokens', data, {headers:headers});
  }

  get_charge_culqi(data: any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer pk_test_bc0ebb8ccb3d5b11'
    });
    return this.http.post('https://api.culqi.com/v2/charges', data, {headers:headers});
  }

  paidOrder(charge: any, orderId:string, token: string){
    const url: string = `${this.url}/orders/paid-order`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'user_token': `${token}`
    });
    return this.http.post<PedidoResponse>(url, {charge, orderId}, {headers: headers})
  }

  finalizedOrder(idOrder: string){
    const url: string = `${this.url}/orders/finalized-order/`+idOrder;
    return this.http.post<FinalizedOrderResponse>(url, {});
  }

  finalizedOrderDelivery(idOrder: string, phoneNumber: string, reference: string){
    const url: string = `${this.url}/orders/finalized-delivery-order/`+idOrder;
    return this.http.post<FinalizedOrderResponse>(url, {phoneNumber, reference});
  }

}
