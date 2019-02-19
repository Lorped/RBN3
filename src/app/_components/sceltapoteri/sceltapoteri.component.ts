import { Component, OnInit } from '@angular/core';

import { SchedaService } from '../../_services/index';

import { SceltaPotere, SceltaPotereDisc } from '../../globals';

@Component({
  selector: 'app-sceltapoteri',
  templateUrl: './sceltapoteri.component.html',
  styleUrls: ['./sceltapoteri.component.css']
})
export class SceltapoteriComponent implements OnInit {

  myListaSceltaPotere: Array<SceltaPotereDisc> = [];
  i = 0 ;

  constructor( private schedaService: SchedaService ) { }

  ngOnInit() {

    this.schedaService.getsceltapoteri()
    .subscribe( (data) => {
      //console.log (data);
      this.myListaSceltaPotere = data;
      //console.log (this.myListaSceltaPotere);

    });

  }

  selezionapot( potx, ix ) {
    console.log("disciplina " + ix);
    console.log("potere " + potx);

    console.log( this.myListaSceltaPotere[ix].NomeDisc );
    for (let i = 0 ; i < this.myListaSceltaPotere[ix].pot.length ; i++ ) {
      if (this.myListaSceltaPotere[ix].pot[i].IDpotere == potx) {
        console.log( this.myListaSceltaPotere[ix].pot[i].NomePotere );

        if (this.myListaSceltaPotere[ix].pot[i].preso == 1 ) {
          this.myListaSceltaPotere[ix].pot[i].preso = 0;
          this.myListaSceltaPotere[ix].numpresi -- ;
        } else {
          this.myListaSceltaPotere[ix].pot[i].preso = 1;
          this.myListaSceltaPotere[ix].numpresi ++ ;
        }

        


      }
    }

  }

}
