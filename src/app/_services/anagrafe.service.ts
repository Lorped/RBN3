import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

export class  AnagrafeRow {
  Nome: string;
  Cognome: string;
  Sesso: string;
  Clan: string;
  ClanImg: string;
}

@Injectable()
export class AnagrafeService {

  constructor( private http: HttpClient ) { }

  anagrafe() {
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/anagrafe.php' ) ;
  }

}
