import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/index';
import { Router } from '@angular/router';


import { Status } from '../../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';


interface logindata {
  Userid: string,
  NomeCognome: string,
  Email: string,
  MasterAdmin: number,
  Sesso: string,
  PS: number;
  PSmax: number;
  FdV: number,
  FdVmax: number
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // loginCredentials = { email: '' , password: '' };

  loginForm = new FormGroup ({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  hide = true ; //visualizzazione passwd
  errmsg = '';
  error = false;

  constructor (private authenticationService: AuthenticationService, private router: Router , private status: Status) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  doLogin() {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (data: logindata) => {
          this.status.Stanza = 0;
          this.status.Userid = Number(data.Userid);
          this.status.MasterAdmin = Number(data.MasterAdmin);
          this.status.Ongame = 'S';
          this.status.Sesso = data.Sesso;
          this.status.FdV = Number (data.FdV);
          this.status.FdVmax = Number (data.FdVmax);
          this.status.PS = Number (data.PS);
          this.status.PSmax = Number (data.PSmax);
          this.router.navigate(['']);
        },
        error => {
          if (error.status == 401 ){
            this.errmsg = "Errore di autenticazione";  
          } else {
            this.errmsg = error.statusText;
          }
          
          this.error = true;
        });
  }

}
