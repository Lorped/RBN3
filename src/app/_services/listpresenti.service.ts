import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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

  constructor(private http: HttpClient) { }

  getpresenti() {

    const mialista = [];

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapresenti.php')
    .map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const newpresente = new Presenti(item.NomeCognome, item.Sesso, item.offgame, item.Userid);
        mialista.push(newpresente);
      }
      return mialista;
    });

  }

  getpginstanza( stanza: number, but: number) {

    const mialista = [];

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapginstanza.php?dove=' + stanza + '&but=' + but)
    .map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const newpresente = new Presenti(item.NomeCognome, item.Sesso, item.offgame, item.Userid);
        mialista.push(newpresente);
      }
      return mialista;
    });

  }


}
