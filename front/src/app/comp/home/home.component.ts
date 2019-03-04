import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clientid: number = null;
  clientname: string = null;
  activecartid: number = null;


  constructor(private sessionService: SessionService, private cartService: CartService) { }

  ngOnInit() {
    this.sessionService.getSession().subscribe(data => {
      this.sessionService.mySessionEmitter.emit(data);
      this.clientid = data.clientid;
      this.clientname = data.clientname;
      this.activecartid = data.activecartid;
    }, (err: HttpErrorResponse) => {
      console.error(err);
      return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
    });

    this.sessionService.mySessionEmitter.subscribe(data => {
      this.clientid = data.clientid;
      this.clientname = data.clientname;
      this.activecartid = data.activecartid;
    });
  }

  maybeNewCart() {
    if (!this.activecartid) {
      this.cartService.addCart().subscribe((data) => {
        console.log(data);
        alert(data.info);
        return this.sessionService.getSession().subscribe(data =>
          this.sessionService.mySessionEmitter.emit(data), (err: HttpErrorResponse) => {
            console.error(err);
            return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
          });
      }, (err: HttpErrorResponse) => {
        console.error(err);
        if (err.error.sqlMessage) {
          return alert(err.error.sqlMessage);
        }
        return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
      });
    }
  }

}
