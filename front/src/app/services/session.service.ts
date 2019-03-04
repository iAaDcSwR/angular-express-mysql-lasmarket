import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../../node_modules/@angular/common/http';
import { Observable } from '../../../node_modules/rxjs';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  };

  mySessionEmitter: EventEmitter<Session> = new EventEmitter();

  constructor(private http: HttpClient) {

  }

  getSession(): Observable<Session> {
    return <Observable<Session>>this.http.post('http://localhost:3000/api/session', null, this.httpOptions);
  }

  /*notifyAll(): void {
    this.mySessionEmitter.emit("update");
  }*/
}
