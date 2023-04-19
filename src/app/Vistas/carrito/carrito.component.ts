import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartaI } from 'src/app/Modelos/carta.interface';
import { CarritoResponse, CartaPedido, FinalizedOrderResponse, Pedido, PedidoResponse } from 'src/app/Modelos/pedido.interface';
import { CarritoService } from 'src/app/Servicios/carta/carrito.service';
import Cleave from 'cleave.js';
import { PedidoService } from 'src/app/Servicios/pedido/pedido.service';
import { ToastrService } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  token: string = '';
  dataCarta: CartaI[] = [];
  idCarta: string[] = [];
  error: string = '';
  formaEntrega: string = 'Presencial';
  card_data: any = {};
  observacion: string = '';
  onObservacionInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.observacion = target.value || '';
  }
  totalPrice: number = 0;
  saleAmount: number = 0;
  orderDetail: string = '';
  charge: any;
  orderId: string = '';
  user_email: string = '';
  phoneNumber: string = '';
  reference: string = '';
  btn_load = false;
  isCardDataValid = false;
  responseCulqi = false;

  constructor( private carritoService: CarritoService, private pedidoService: PedidoService, private router: Router, private toastr: ToastrService ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') ?? '';
    this.user_email = localStorage.getItem('user_email') ?? '';
    this.getCarrito();

    setTimeout(() => {
      new Cleave('#cc-number', {
        creditCard: true,
        onCreditCardTypeChanged: function (type) {
          // update UI ...
        },
      });

      new Cleave('#cc-exp-date', {
        date: true,
        datePattern: ['m', 'Y'],
      });
    });

    setTimeout(() => {
      this.calcularTotal();
    }, 500);
  }

  removeCarta(id: string) {
    this.carritoService.removeCarta(id);
    let cartasIdString: string;
    let cartasIdArray: string;
    setTimeout(() => {
      cartasIdString = localStorage.getItem('idCarta') || '[]';
      cartasIdArray = JSON.parse(cartasIdString);
    }, 20);

    setTimeout(() => {
      this.carritoService
        .saveCarritoToUser(cartasIdArray, this.token)
        .subscribe({
          next: (resp: CarritoResponse) => {
            this.toastr.info("Producto eliminado. "+resp.message , "Info");
          },
          error: (err) => {
            this.toastr.error(err.error.msg, "Error");
          },
        });
    }, 80);

    setTimeout(() => {
      this.getCarrito();
    }, 200);

    setTimeout(() => {
      this.calcularTotal();
    }, 500);
  }

  removeAllCarta() {
    this.idCarta = [];
    this.dataCarta = [];
    localStorage.setItem('idCarta', '[]');

    setTimeout(() => {
      this.carritoService.saveCarritoToUser([], this.token).subscribe({
        next: (resp: CarritoResponse) => {
          this.toastr.info("Productos eliminados. "+resp.message, "Info");
        },
      });
    }, 50);

    setTimeout(() => {
      this.getCarrito();
    }, 200);
  }

  getCarrito() {
    this.carritoService.getSavedCarrito(this.token).subscribe(
      (dataCarta: CartaI[]) => {
        this.dataCarta = dataCarta.map((data) => {
          return { ...data, quantity: 1 };
        });
        this.idCarta = dataCarta.map((carta: CartaI) => carta._id);
        localStorage.setItem('idCarta', JSON.stringify(this.idCarta));
      },
      (error) => {
        this.error = error.error.message;
        this.toastr.error(this.error, "Error");
      }
    );
  }

  calcularTotal() {
    this.totalPrice = 0;
    for (const carta of this.dataCarta) {
      this.totalPrice += carta.price * carta.quantity;
    }
  }

  validateCardData(): void {
    if (this.formaEntrega == "Presencial" && this.card_data.ncard && this.card_data.exp && this.card_data.cvc) {
      this.isCardDataValid = true;
    } else if (this.formaEntrega == "Delivery" && this.card_data.ncard && this.card_data.exp && this.card_data.cvc && this.phoneNumber && this.reference){
      this.isCardDataValid = true;
    } else{
      this.isCardDataValid = false;
    }
    
  }

  peticionesCulqi() {
    let exp_arr = this.card_data.exp.toString().split('/');

    let data = {
      card_number: this.card_data.ncard.toString().replace(/ /g, ''),
      cvv: this.card_data.cvc,
      expiration_month: exp_arr[0],
      expiration_year: exp_arr[1].toString().substr(0, 4),
      email: this.user_email,
    };
    setTimeout(() => {
      this.pedidoService.get_token_culqi(data).subscribe((response) => {
        console.log(((this.totalPrice*1.18)*100).toFixed(0))
        let charge = {
          amount: ((this.totalPrice*1.18)*100).toFixed(0),
          currency_code: 'PEN',
          email: this.user_email,
          source_id: response.id,
        };
        this.pedidoService.get_charge_culqi(charge).subscribe((response) => {
          this.pedidoService
            .paidOrder(response, this.orderId, this.token)
            .subscribe((response) => {
              console.log()
              this.btn_load = false;
              this.responseCulqi = true;
              this.finalizarOrden();
            });
        });
      });
    }, 500);
  }

  finalizarOrden(){
      if (this.formaEntrega == "Presencial") {
        this.pedidoService.finalizedOrder(this.orderId).subscribe(
          (resp: FinalizedOrderResponse) => {
            this.toastr.success(resp.message, 'Success');
            this.getCarrito();
          },
          (err) => {
            let errorResponse: FinalizedOrderResponse = err.error;
            this.toastr.error(errorResponse.message, 'Error')
          }
        );
      }
      if (this.formaEntrega == "Delivery") {
        this.pedidoService.finalizedOrderDelivery(this.orderId, this.phoneNumber, this.reference).subscribe(
          (resp: FinalizedOrderResponse) => {
            this.toastr.success(resp.message, 'Success');
            this.getCarrito();
          },
          (err) => {
            let errorResponse: FinalizedOrderResponse = err.error;
            this.toastr.error(errorResponse.message, 'Error')
          }
        );
      }
  }

  crearOrdenDePedido() {
    const pedidoRequest: Pedido = {
      deliveryDate: new Date(),
      observation: this.observacion,
      saleType: this.formaEntrega,
      data: [],
    };
    this.btn_load = true;
    setTimeout(() => {
      this.dataCarta.forEach((carta: CartaI) => {
        const cartPedido: CartaPedido = {
          Cart: carta.name,
          quantity: carta.quantity,
        };
        pedidoRequest.data.push(cartPedido);
      });
    }, 50);

    setTimeout(() => {
      this.pedidoService
        .createOrderDetail(
          pedidoRequest.deliveryDate,
          pedidoRequest.observation,
          pedidoRequest.saleType,
          pedidoRequest.data,
          this.token
        )
        .subscribe(
          (res: PedidoResponse) => {
            this.orderId = res.orderId;
            console.log(this.orderId)
          },
          (err) => {
            console.log(err);
            this.toastr.error(err.error, "Error");
          }
        );
    }, 200);

    setTimeout(() => {
      this.peticionesCulqi();
    }, 300); 

    setTimeout(() => {
      //this.removeAllCarta();
      localStorage.setItem('idCarta', '[]');
    }, 2000);
  }
}
