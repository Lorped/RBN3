import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {Status} from '../globals'

export class chatrow {
  IDchat: number;
  Stanza: number;
  IDMittente: number;
  Mittente: string;
  IDDestinatario: number;
  Destinatario: string;
  Ora:  string;
  Sesso:  string;
  Tipo: string;
  Testo: string;
  Locazione: string;
  constructor(
    aIDchat: number,
    aStanza: number,
    aIDMittente: number,
    aMittente: string,
    aIDDestinatario: number,
    aDestinatario: string,
    aOra:  string,
    aSesso:  string,
    aTipo: string,
    aTesto: string,
    aLocazione: string
  ) {
    this.IDchat= aIDchat;
    this.Stanza= aStanza;
    this.IDMittente= aIDMittente;
    this.Mittente= aMittente;
    this.IDDestinatario= aIDDestinatario;
    this.Destinatario= aDestinatario;
    this.Ora=  aOra;
    this.Sesso=  aSesso;
    this.Tipo= aTipo;
    this.Testo= aTesto;
    this.Locazione= aLocazione;
  }
}

export class myChat {
  Statuschat: number;
  Listachat: Array<chatrow>;
  Last: number;
  constructor (
    aStatuschat: number,
    aListachat:  Array<chatrow>,
    aLast: number
  ) {
    this.Statuschat=aStatuschat;
    this.Listachat = aListachat;
    this.Last = aLast;
  }
}


@Injectable()
export class ChatService {

  constructor( private status: Status, private http: HttpClient) { }

  getchat(){
    var user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/chat.php',  {token: user, loc: this.status.Stanza, last: this.status.Last})
  }
}
