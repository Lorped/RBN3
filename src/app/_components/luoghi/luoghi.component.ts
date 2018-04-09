import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import {Status} from '../../globals'

export class Luogo {
  Tipo: string;
  ID: number;
  Breve: string;
  NomeMappa: number;
  constructor ( aTipo: string, aID: number, aBreve: string, aMappa: number) {
    this.Tipo=aTipo;
    this.ID=aID;
    this.Breve=aBreve;
    this.NomeMappa=aMappa;
  }
}

@Component({
  selector: 'app-luoghi',
  templateUrl: './luoghi.component.html',
  styleUrls: ['./luoghi.component.css']
})
export class LuoghiComponent implements OnInit {

  listaluoghi: Array<Luogo>;

  constructor( private status: Status , private http: HttpClient , private router: Router ) { }

  ngOnInit() {
    this.getLuoghi();
  }

  getLuoghi () {
    var mialista = [];
    this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/luoghi.php?dove='+this.status.Stanza )
    .map((res: Array<any>) => {
      for (let i = 0; i < res.length; i++) {
        let item = res[i];
        let newluogo = new Luogo(item.Tipo, item.ID, item.Breve, item.NomeMappa);
        mialista.push(newluogo);
      }
      return mialista;
    })
    .subscribe( data => {
      this.listaluoghi=data;
    })
  }

  cambialoc(newloc: number , newmap: number ) {
    this.status.Stanza=newloc;
    this.status.Last=0;


    if ( newmap === null  ) {
      this.router.navigate(['/chat/'+newloc]);
    } else {
      if ( this.status.Subscriber ) this.status.Subscriber.unsubscribe();
      this.router.navigate(['/mappa/'+newmap]);
    }
    this.getLuoghi();
  }
}
