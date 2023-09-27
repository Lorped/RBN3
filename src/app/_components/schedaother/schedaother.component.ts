import { Component, OnInit } from '@angular/core';
import { SchedaService, datidabio } from '../../_services/index';
import { Status } from '../../globals';
import {  Basicpg, Personaggio } from '../../globals';

@Component({
  selector: 'app-schedaother',
  templateUrl: './schedaother.component.html',
  styleUrls: ['./schedaother.component.css']
})
export class SchedaotherComponent implements OnInit {

  myPG: Personaggio = new Personaggio;
  myaPG: Basicpg = this.myPG.aPG;

  necro = [];
  taum = [];

  bio = '';
  descrizione = '';
  annotazioni = '';
  StatusPG = 0;

  today: number = (new Date()).getFullYear();

  constructor( private schedaService: SchedaService, public status: Status) { }

  ngOnInit() {
    this.myaPG.URLImg="nopicture.gif";
    this.schedaService.getpg(this.status.otherID)
    .subscribe( (data: Personaggio) => {

      this.myPG = data;
      this.myaPG = this.myPG.aPG;
      this.myaPG.ModSalute = Number (this.myaPG.ModSalute);

      console.log()

    });

    this.schedaService.getnecrotaum(this.status.otherID)
    .subscribe ( data => {
      this.necro = data.necro;
      this.taum = data.taum;
    });

    this.schedaService.getbio(this.status.otherID)
    .subscribe ( (data: datidabio) => {

      this.bio = data.pg.Background;
      this.descrizione = data.pg.Descrizione;
      this.annotazioni = data.pg.Annotazioni;
      this.StatusPG = data.pg.StatusPG;

      console.log(data);

    });

  }

}
