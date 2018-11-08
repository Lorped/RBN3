
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SignupService {
  constructor(private http: HttpClient) {}

  checkEmail (email: string) {
    interface Ares {
      res: string;
    }
    return this.http
      .get('https://www.roma-by-night.it/RBN3/wsPHP/checkemail.php?email=' + email).pipe(
      map( (data: Ares) => data.res ));
  }


  getregistra1 () {
    return this.http
      .get('https://www.roma-by-night.it/RBN3/wsPHP/getregistra1.php');
  }

  getregistra2 () {
    return this.http
      .get('https://www.roma-by-night.it/RBN3/wsPHP/getregistra2.php');
  }

  getregistra3 (clan: number) {
    return this.http
      .get('https://www.roma-by-night.it/RBN3/wsPHP/getregistra3.php?IDclan=' + clan);
  }

  sendregistra (myobj: any) {
      return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/sendregistra.php', {
        myobj: myobj
      });
  }

}
