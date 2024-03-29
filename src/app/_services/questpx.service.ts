
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Status } from '../globals';

export class Questrow {
  IDquest: number;
  Quest: string;
  MasterOpen: string;
  DataOpen: string;
  Px: number;
  Status: string;
  DataClose: string;
  MasterClose: string;
  constructor (
    aIDquest: number,
    aQuest: string,
    aMasterOpen: string,
    aDataOpen: string,
    aPx: number,
    aStatus: string,
    aDataClose: string,
    aMasterClose: string
  ) {
    this.IDquest = aIDquest;
    this.Quest = aQuest;
    this.MasterOpen = aMasterOpen;
    this.DataOpen = aDataOpen;
    this.Px = aPx;
    this.Status = aStatus;
    this.DataClose = aDataClose;
    this.MasterClose = aMasterClose;
  }
}

export class Logrow {
  IDlog: number;
  data: string;
  Userid: number;
  px: number;
  dati: string;
  Master: string;
  constructor (
    aIDlog: number,
    adata: string,
    aUserid: number,
    apx: number,
    adati: string,
    aMaster: string,
  ) {
    this.IDlog = aIDlog;
    this.data = adata;
    this.Userid = aUserid;
    this.px = apx;
    this.dati = adati;
    this.Master = aMaster;
  }
}

export class Logpx {
  public pxin: number;
  public pxout: number;
  public log: Array<Logrow>;
  constructor () {
    this.pxin = 0;
    this.pxout = 0 ;
    this.log = [];
  }
}

@Injectable()
export class QuestpxService {

  constructor( private status: Status, private http: HttpClient ) { }

  getquest (id: number) {

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/quest.php?id=' + id.toString() );
   
  }

  getlogpx () {

    const miologpx = new Logpx;

    return this.http.get ('https://www.roma-by-night.it/RBN3/wsPHP/getlogpx.php?id=' + this.status.Userid.toString() ).pipe(
    map((res: Logpx) => {
      miologpx.pxin = Number( res.pxin );
      miologpx.pxout = Number( res.pxout );
      miologpx.log = res.log;
      return miologpx;
    }));
  }

  getpx () {

    interface Apx {
      px: number;
    }
    return this.http.get ('https://www.roma-by-night.it/RBN3/wsPHP/getpx.php?id=' + this.status.Userid.toString() ).pipe(
    map((res: Apx) => res.px));
  }

  sendquest(quest: string, player: number, px: number){
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/sendquest.php', {
      token: user,
      quest: quest,
      player: player,
      px: px
    } );
  }

  esitoquest(IDquest: number, esito: string){
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/esitoquest.php', {
      token: user,
      IDquest: IDquest,
      esito: esito
    } );
  }

}
