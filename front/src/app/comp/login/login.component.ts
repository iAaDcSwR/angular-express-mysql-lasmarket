import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { ClientService } from '../../services/client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string; //  varchar(45)
  password: string; //  varchar(45)

  constructor(private clientService: ClientService, private sessionService: SessionService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(45)]), //  varchar(45)
      password: new FormControl(null, [Validators.maxLength(45)]), //  varchar(45)
    });
  }

  ngOnInit() {

  }

  async sendTheForm() {
    this.clientService.login(this.loginForm.value).subscribe((data) => {
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
