import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { EmitterService, ListpresentiService } from '../../_services/index';



// import 'rxjs/add/operator/map' ;
import {Status} from '../../globals';
import { Subscription } from 'rxjs';

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
export class LuoghiComponent implements OnInit, OnDestroy {

  listaluoghi: Array<Luogo>;
  sub1: Subscription;

  constructor( private status: Status , private http: HttpClient , private router: Router, private presentiservice: ListpresentiService , private emitter: EmitterService) { }

  ngOnInit() {
     
    //console.log("here");
    this.getLuoghi();

    this.sub1 = this.emitter.emitOnNavEnd().subscribe(()=>{
      this.getLuoghi();
    });
  }

  getLuoghi () {
    const mialista = [];
    const user = sessionStorage.getItem('RBN3currentUser') ;


    this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/luoghi.php', {Dove: this.status.Stanza, token: user} )
    .subscribe ((data: Array<Luogo>)=> {
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

    this.presentiservice.moveto(newloc).subscribe( () => {
      
      if ( newmap === null  ) {
        this.router.navigate(['/chat/' + newloc]);
      } else {
        this.router.navigate(['/mappa/' + newmap]);
      }
      this.getLuoghi();

    });

  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
  }
}
