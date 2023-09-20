
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../globals';


export class Presenti {
  NomeCognome: string;
  Sesso: string;
  offgame: number;
  Userid: number;
  ongame: string;
  Breve: string;
  constructor(
    aNomeCognome: string,
    aSesso: string,
    aoffgame: number,
    aUserid: number,
    aongame: string,
    aBreve: string
  ) {
    this.NomeCognome = aNomeCognome;
    this.Sesso = aSesso;
    this.offgame = aoffgame;
    this.Userid = aUserid;
    this.ongame = aongame;
    this.Breve = aBreve;
  }
}


@Injectable()
export class ListpresentiService {

  constructor(private http: HttpClient, private status: Status) { }

  getpresenti() {

    const mialista = [];

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapresenti.php?id=' + this.status.Userid.toString() ).pipe(
    map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const newpresente = new Presenti(item.NomeCognome, item.Sesso, item.offgame, Number(item.Userid), item.ongame, item.Breve);
        mialista.push(newpresente);
      }
      return mialista;
    }));

  }

  getpginstanza( stanza: number, but: number) {

    const mialista = [];

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapginstanza.php?dove=' + stanza.toString() + '&but=' + but.toString() ).pipe(
    map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const newpresente = new Presenti(item.NomeCognome, item.Sesso, item.offgame, Number(item.Userid), item.ongame, '');
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

  moveto(stanza: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    // console.log(id);
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/moveto.php', {
      token: user,
      stanza: stanza
    } );
  }


}
