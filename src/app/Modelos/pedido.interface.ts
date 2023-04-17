export interface CarritoResponse {
    message: string;
}

export interface CartaPedido {
    Cart: string;
    quantity: number;
}
  
export interface Pedido {
    deliveryDate: Date;
    observation: string;
    saleType: string;
    data: CartaPedido[];
}

export interface PedidoResponse {
    message: string;
    orderId: string;
}

export interface FinalizedOrderResponse {
    message: string;
    receiptId: string;
}