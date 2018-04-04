import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

import {Status} from '../globals'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials = { email: '' , password: '' };
  errmsg="";
  returnUrl: string;

  constructor( private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router , private status: Status) { }

  ngOnInit() {
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  doLogin() {
    this.authenticationService.login(this.loginCredentials.email, this.loginCredentials.password)
      .subscribe(
        data => {
          this.status.Userid=data.Userid;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.errmsg=error.statusText;
        });
  }

}
