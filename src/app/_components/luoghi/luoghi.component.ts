import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router, NavigationEnd } from '@angular/router';



// import 'rxjs/add/operator/map' ;
import {Status} from '../../globals';

export class Luogo {
  Tipo: string;
  ID: number;
  Breve: string;
  NomeMappa: number;
  constructor ( aTipo: string, aID: number, aBreve: string, aMappa: number) {
    this.Tipo = aTipo;
    this.ID = aID;
    this.Breve = aBreve;
    this.NomeMappa = aMappa;
  }
}

@Component({
  selector: 'app-luoghi',
  templateUrl: './luoghi.component.html',
  styleUrls: ['./luoghi.component.css']
})
export class LuoghiComponent implements OnInit {

  listaluoghi: Array<Luogo>;

  constructor( private status: Status , private http: HttpClient , private router: Router) {
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd == true ) {
        console.log("IN = ", this.status.Stanza);
        this.getLuoghi();
      }

    });

   }

  ngOnInit() {
     

    this.getLuoghi();
  }

  getLuoghi () {
    const mialista = [];
    const user = sessionStorage.getItem('RBN3currentUser') ;


    this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/luoghi.php', {Dove: this.status.Stanza, token: user} )
    .subscribe ((data: Array<any>)=> {
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const newluogo = new Luogo(item.Tipo, item.ID, item.Breve, item.NomeMappa);
        mialista.push(newluogo);
      }
      this.listaluoghi = mialista;

    });

 

  }

  cambialoc(newloc: number , newmap: number ) {
    this.status.Stanza = newloc;
    this.status.Last = 0;

    this.status.Alive = false;

    if ( newmap === null  ) {
      this.router.navigate(['/chat/' + newloc]);
    } else {
      this.router.navigate(['/mappa/' + newmap]);
    }
    this.getLuoghi();
  }
}
