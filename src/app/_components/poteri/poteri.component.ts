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

  myLista: Array<ListaPoteri> = [];

  constructor( private schedaService: SchedaService, private status: Status ) { }

  ngOnInit() {

    this.schedaService.getsete(this.status.Userid)
    .subscribe( (data) => {
      this.mysete = Number(data.Sete);
      console.log(this.mysete);
    });

    this.schedaService.getpoteri()
    .subscribe( (data) => {
      this.myListaPot = data;
      console.log(this.myListaPot);
    });

  }

}
