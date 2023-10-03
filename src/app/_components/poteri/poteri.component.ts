import { Component, OnInit } from '@angular/core';

import { ListaPoteri, SchedaService } from '../../_services/index';

import { Status } from '../../globals';



@Component({
  selector: 'app-poteri',
  templateUrl: './poteri.component.html',
  styleUrls: ['./poteri.component.css']
})
export class PoteriComponent implements OnInit {

  myPS= 0;
  myPSmax = 0;
  myFdV = 0 ;
  myFdVmax = 0 ;

  myLista: Array<ListaPoteri> = [];

  constructor( private schedaService: SchedaService, private status: Status ) { }

  ngOnInit() {

    this.myPS = this.status.PS;
    this.myPSmax = this.status.PSmax;
    this.myFdV = this.status.FdV;
    this.myFdVmax = this.status.FdVmax;

    this.schedaService.getpoteri()
    .subscribe( (data: Array<ListaPoteri>) => {
      
      
      for (let i=0 ; i<data.length; i++) {
        for (let j = 0 ; j < data[i].pot.length ; j++ ) {
          data[i].pot[j].Difficolta = Number ( data[i].pot[j].Difficolta );
          data[i].pot[j].UsoSangue = Number ( data[i].pot[j].UsoSangue );
          data[i].pot[j].UsoFdV = Number ( data[i].pot[j].UsoFdV );
          data[i].pot[j].TotaleDP = Number ( data[i].pot[j].TotaleDP );
        }
      }
      this.myLista = data;

      console.log(this.myLista);
    });

  }



}
