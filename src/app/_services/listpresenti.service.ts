import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

export class presenti {
  NomeCognome: string;
  Sesso: string;
  offgame: number;
  constructor(
    aNomeCognome: string,
    aSesso: string,
    aoffgame: number
  ) {
    this.NomeCognome=aNomeCognome;
    this.Sesso=aSesso;
    this.offgame=aoffgame;
  }
}


@Injectable()
export class ListpresentiService {

  constructor(private http: HttpClient) { }

  getpresenti(){

    var mialista = [];

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapresenti.php')
    .map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        let item = res[i];
        let newpresente = new presenti(item.NomeCognome, item.Sesso, item.offgame);
        mialista.push(newpresente);
      }
      return mialista;
    })

  }

}
