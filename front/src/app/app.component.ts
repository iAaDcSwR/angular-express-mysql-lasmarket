import { Component } from '@angular/core';
import { SessionService } from './services/session.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    /*this.sessionService.getSession().subscribe(data => {
      this.sessionService.mySessionEmitter.emit(data);
    }, (err: HttpErrorResponse) => {
      console.error(err);
      return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
    });*/
  }
}
