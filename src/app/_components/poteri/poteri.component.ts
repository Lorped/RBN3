import { Component, OnInit } from '@angular/core';

import { SchedaService } from '../../_services/index';

import { Potere, ListaPoteri, Status } from '../../globals';

@Component({
  selector: 'app-poteri',
  templateUrl: './poteri.component.html',
  styleUrls: ['./poteri.component.css']
})
export class PoteriComponent implements OnInit {

  mysete = 0 ;
  myFdV = 0 ;
  myFdVmax = 0 ;

  myLista: Array<ListaPoteri> = [];

  constructor( private schedaService: SchedaService, private status: Status ) { }

  ngOnInit() {

    this.schedaService.getsetefdv(this.status.Userid)
    .subscribe( (data) => {
      //console.log (data);
      this.mysete = Number(data.Sete);
      this.myFdV = Number(data.FdV);
      this.myFdVmax = Number(data.FdVmax);

    });

    this.schedaService.getpoteri()
    .subscribe( (data) => {
      this.myLista = data;

      //console.log(this.myLista);
    });

  }

}
