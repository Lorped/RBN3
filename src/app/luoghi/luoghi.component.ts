import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Status} from '../globals'

export class Luogo {
  Tipo: string;
  ID: number;
  Breve: string;
  constructor ( aTipo: string, aID: number, aBreve: string) {
    this.Tipo=aTipo;
    this.ID=aID;
    this.Breve=aBreve;
  }
}

@Component({
  selector: 'app-luoghi',
  templateUrl: './luoghi.component.html',
  styleUrls: ['./luoghi.component.css']
})
export class LuoghiComponent implements OnInit {

  listaluoghi: Array<Luogo>;

  constructor( private status: Status , private http: HttpClient) { }

  ngOnInit() {
    this.getLuoghi();
  }

  getLuoghi () {
    var mialista = [];
    this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/luoghi.php?dove='+this.status.Stanza )
    .map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        let item = res[i];
        let newluogo = new Luogo(item.Tipo, item.ID, item.Breve);
        mialista.push(newluogo);
      }
      return mialista;
    })
    .subscribe( data => {
      this.listaluoghi=data;
    })
  }

  cambialoc(newloc: number) {
    this.status.Stanza=newloc;
    this.getLuoghi();
  }
}
