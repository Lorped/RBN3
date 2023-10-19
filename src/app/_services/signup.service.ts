
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Archetipo, Attributo, Clan, Skill } from '../globals';

export interface getreg1 {
  clan: Array<Clan>;
  archetipi: Array <Archetipo>;
  attributi: Array<Attributo>;
}
export interface getreg2 {
  skill: Array<Skill>;

}

@Injectable()
export class SignupService {
  constructor(private http: HttpClient) {}

  checkEmail (email: string) {
    interface Ares {
      res: string;
    }
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/checkemail.php?email=' + email).pipe(
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

  sendregistra (myobj) {
      return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/sendregistra.php', {
        myobj: myobj
      });
  }

}
