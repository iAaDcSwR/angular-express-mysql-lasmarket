import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { ClientService } from '../../services/client.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  fname: string; // varchar(45)
  lname: string; //  varchar(45)
  email: string; //  varchar(45)
  id: string; //  int(9) UN zerofill PK
  password: string; //  varchar(45)
  city: string; //  varchar(45)
  street: string; //  varchar(45)

  constructor(private clientService: ClientService) {
    this.registerForm = new FormGroup({
      fname: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]), // varchar(45)
      lname: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]), //  varchar(45)
      email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(45)]), //  varchar(45)
      id: new FormControl(null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]), //  int(9) UN zerofill PK
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(45)]), //  varchar(45)
      city: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]), //  varchar(45)
      street: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(45)]) //  int(11)
    });
  }

  ngOnInit() {

  }

  async sendTheForm() {
    this.clientService.register(this.registerForm.value).subscribe((data) => {
      console.log(data);
      alert(data.info);
      return this.clientService.logout().subscribe(data => {
        console.log(data);
        alert(data.info);
        return this.clientService.login({ email: this.registerForm.value.email, password: this.registerForm.value.password }).subscribe(data => {
          console.log(data);
          alert(data.info);
          return location.href = "/";
        }, (err: HttpErrorResponse) => {
          console.error(err);
          if (err.error.sqlMessage) {
            return alert(err.error.sqlMessage);
          }
          return alert('Unknown Error: make sure both server (port 3000) and MySQL (port 3306) are running');
        });
      }, (err: HttpErrorResponse) => {
        console.error(err);
        if (err.error.sqlMessage) {
          return alert(err.error.sqlMessage);
        }
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
