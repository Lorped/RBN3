
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../globals';


export class Presenti {
  NomeCognome: string;
  Sesso: string;
  offgame: number;
  Userid: number;
  ongame: number;
  constructor(
    aNomeCognome: string,
    aSesso: string,
    aoffgame: number,
    aUserid: number,
    aongame: number
  ) {
    this.NomeCognome = aNomeCognome;
    this.Sesso = aSesso;
    this.offgame = aoffgame;
    this.Userid = aUserid;
    this.ongame = aongame;
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
        const newpresente = new Presenti(item.NomeCognome, item.Sesso, item.offgame, Number(item.Userid), item.ongame);
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
        const newpresente = new Presenti(item.NomeCognome, item.Sesso, item.offgame, Number(item.Userid), item.ongame);
        mialista.push(newpresente);
      }
      return mialista;
    }));

  }

  changeonoffgame() {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    // console.log(id);
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/changeonoffgame.php', {
      token: user
    } );
  }


}
