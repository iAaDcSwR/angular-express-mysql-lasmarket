import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  myCartEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  getCartByID(id: number): Observable<Cart> {
    return <Observable<Cart>>this.http.get('http://localhost:3000/api/cart/' + id);
  }

  addCart(): Observable<any> {
    return <Observable<any>>this.http.post('http://localhost:3000/api/cart', null, this.httpOptions);
  }

  notifyAll(): void {
    this.myCartEmitter.emit("update");
  }
}
