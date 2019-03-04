import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { CartItem } from '../models/cartitem';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  myCartItemEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  getCartItemsByCartID(cartid: number): Observable<CartItem[]> {
    return <Observable<CartItem[]>>this.http.get('http://localhost:3000/api/cartitem/' + cartid);
  }

  addCartItem(cartitem: { productid: number, quantity: number, unitprice: number }): Observable<any> {
    return <Observable<any>>this.http.post('http://localhost:3000/api/cartitem', cartitem, this.httpOptions);
  }

  deleteCartItem(id: number): Observable<any> {
    return <Observable<any>>this.http.delete('http://localhost:3000/api/cartitem/' + id, this.httpOptions);
  }

  notifyAll(): void {
    this.myCartItemEmitter.emit("update");
  }
}
