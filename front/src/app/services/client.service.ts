import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  myClientEmitter: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  register(client: Client): Observable<any> {
    return <Observable<any>>this.http.post('http://localhost:3000/api/client', client, this.httpOptions);
  }

  login(client: { email: string, password: string }): Observable<any> {
    return <Observable<any>>this.http.post('http://localhost:3000/api/login', client, this.httpOptions);
  }

  logout(): Observable<any> {
    return <Observable<any>>this.http.post('http://localhost:3000/api/logout', null, this.httpOptions);
  }

  notifyAll(): void {
    this.myClientEmitter.emit("update");
  }
}
