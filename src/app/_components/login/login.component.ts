import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/index';
import { Router } from '@angular/router';


import { Status } from '../../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
        data => {
          this.status.Stanza = 0;
          this.status.Userid = data.Userid;
          this.status.MasterAdmin = data.MasterAdmin;
          this.router.navigate(['']);
          this.status.Ongame = 'S';
        },
        error => {
          if (error.status = 401 ){
            this.errmsg = "Errore di autenticazione";  
          } else {
            this.errmsg = error.statusText;
          }
          
          this.error = true;
        });
  }

}
