import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  myOrderEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  addOrder(order: Order): Observable<Order> {
    return <Observable<Order>>this.http.post('http://localhost:3000/api/order', order, this.httpOptions);
  }

  notifyAll(): void {
    this.myOrderEmitter.emit("update");
  }
}
