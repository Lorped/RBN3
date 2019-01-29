
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../globals';


export class Presenti {
  NomeCognome: string;
  Sesso: string;
  offgame: number;
  Userid: number;
  constructor(
    aNomeCognome: string,
    aSesso: string,
    aoffgame: number,
    aUserid: number
  ) {
    this.NomeCognome = aNomeCognome;
    this.Sesso = aSesso;
    this.offgame = aoffgame;
    this.Userid = aUserid;
  }
}


@Injectable()
export class ListpresentiService {

  constructor(private http: HttpClient, private status: Status) { }

  getpresenti() {

    const mialista = [];

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapresenti.php?id='+this.status.Userid).pipe(
    map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const newpresente = new Presenti(item.NomeCognome, item.Sesso, item.offgame, item.Userid);
        mialista.push(newpresente);
      }
      return mialista;
    }));

  }

  getpginstanza( stanza: number, but: number) {

    const mialista = [];

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapginstanza.php?dove=' + stanza + '&but=' + but).pipe(
    map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const newpresente = new Presenti(item.NomeCognome, item.Sesso, item.offgame, item.Userid);
        mialista.push(newpresente);
      }
      return mialista;
    }));

  }


}
