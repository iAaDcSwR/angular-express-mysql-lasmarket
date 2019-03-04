import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  myProductEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  getProductsByCategory(categoryid: number): Observable<Product[]> {
    return <Observable<Product[]>>this.http.get('http://localhost:3000/api/category/' + categoryid);
  }

  getProductByID(id: number): Observable<Product[]> {
    return <Observable<Product[]>>this.http.get('http://localhost:3000/api/product/' + id);
  }

  addProduct(product: Product): Observable<any> {
    return <Observable<any>>this.http.post('http://localhost:3000/api/product', product, this.httpOptions);
  }

  updateProduct(product: Product): Observable<any> {
    return <Observable<any>>this.http.put('http://localhost:3000/api/product/' + product.id, product, this.httpOptions);
  }

  deleteProduct(id: number): Observable<any> {
    return <Observable<any>>this.http.delete('http://localhost:3000/api/product/' + id, this.httpOptions);
  }

  notifyAll(): void {
    this.myProductEmitter.emit("update");
  }
}
