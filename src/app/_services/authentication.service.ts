
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/login.php', {
      email: email,
      password: password
    }).pipe(
    map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('RBN3currentUser', user.token );
      }
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/logout.php', {
      token: user
    });


  }
}
