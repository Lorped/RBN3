import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/login.php', { email: email, password: password })
    .map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('RBN3currentUser', user.token );
        //sessionStorage.setItem('RBN3currentUser', JSON.stringify(user));
      }
      return user;
    });
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('RBN3currentUser');
  }
}
