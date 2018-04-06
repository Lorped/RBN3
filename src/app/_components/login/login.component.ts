import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/index';
import { Router } from '@angular/router';

import { Status } from '../../globals'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials = { email: '' , password: '' };
  errmsg="";
  returnUrl: string;

  constructor( private authenticationService: AuthenticationService, private router: Router , private status: Status) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  doLogin() {
    this.authenticationService.login(this.loginCredentials.email, this.loginCredentials.password)
      .subscribe(
        data => {
          this.status.Userid=data.Userid;
          this.router.navigate(['']);
        },
        error => {
          this.errmsg=error.statusText;
        });
  }

}
