import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  myCategoryEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  getAllCategories(): Observable<Category[]> {
    return <Observable<Category[]>>this.http.get('http://localhost:3000/api/category/');
  }

  notifyAll(): void {
    this.myCategoryEmitter.emit("update");
  }
}