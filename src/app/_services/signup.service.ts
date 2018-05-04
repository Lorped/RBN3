import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SignupService {
  constructor(private http: HttpClient) {}

  checkEmail(email: string) {

    interface ares {
      res: string;
    }

    return this.http
      .get('https://www.roma-by-night.it/RBN3/wsPHP/checkemail.php?email='+email)
      .map( (data: ares) => data.res );

  }
}
