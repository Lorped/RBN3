import { Component, OnInit } from '@angular/core';

import { SchedaService } from '../../_services/index';

import {  ListaPoteri, Status } from '../../globals';



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


    this.schedaService.getpoteri()
    .subscribe( (data: Array<ListaPoteri>) => {
      this.myLista = data;

      console.log(this.myLista);
    });

  }



}
