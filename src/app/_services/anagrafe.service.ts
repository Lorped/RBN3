import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class  AnagrafeRow {
  Userid: number;
  Nome: string;
  Cognome: string;
  Sesso: string;
  Clan: string;
  Setta: string;
  ClanImg: string;
  SettaImg: string;
  URLImg: string;
  OraEntrata: string;
}

@Injectable()
export class AnagrafeService {

  constructor( private http: HttpClient ) { }

  anagrafe() {
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/anagrafe.php' ) ;
  }

}
