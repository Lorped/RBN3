import { Component, OnInit } from '@angular/core';
import { Personaggio } from '../personaggio';
import { AuthenticationService } from '../_services/index';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginCredentials = { email: '' , password: '' };
  errmsg="";

  constructor( private authenticationService: AuthenticationService ) { }

  ngOnInit() {
    this.authenticationService.logout();
  }
  doLogin() {
    this.authenticationService.login(this.loginCredentials.email, this.loginCredentials.password)
              .subscribe(
                  data => {
                      // ok do stuff
                      console.log("login ok");
                  },
                  error => {
                      console.log("login ko");
                      console.log(error)
                      this.errmsg=error.statusText;
                  });
  }

}
