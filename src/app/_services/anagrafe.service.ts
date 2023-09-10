import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class  AnagrafeRow {
  Userid = 0;
  Nome = '';
  Cognome = '';
  Sesso = '';
  Clan = '';
  Setta = '';
  ClanImg = '';
  SettaImg = '';
  URLImg = '';
  OraEntrataF = '';
}

@Injectable()
export class AnagrafeService {

  constructor( private http: HttpClient ) { }

  anagrafe() {
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/anagrafe.php' ) ;
  }

}
