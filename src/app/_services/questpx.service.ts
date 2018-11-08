
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

  getquest () {

    const mialista = [];

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/quest.php?id=' + this.status.Userid).pipe(
    map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        const item = res[i];
        const newquest = new Questrow ( item.IDquest, item.Quest, item.MasterOpen, item.DataOpen,
          item.Px, item.Status, item.DataClose, item.MasterClose);
          mialista.push(newquest);
      }

      return mialista;
    }));

  }

  getlogpx () {

    const miologpx = new Logpx;

    return this.http.get ('https://www.roma-by-night.it/RBN3/wsPHP/getlogpx.php?id=' + this.status.Userid).pipe(
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
    return this.http.get ('https://www.roma-by-night.it/RBN3/wsPHP/getpx.php?id=' + this.status.Userid).pipe(
    map((res: Apx) => res.px));
  }

}
