import { Component, OnInit } from '@angular/core';
import { QuestpxService, Questrow, SchedaService, datidabio } from '../../_services/index';
import { Status } from '../../globals';
import {  Basicpg, Personaggio } from '../../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedaother',
  templateUrl: './schedaother.component.html',
  styleUrls: ['./schedaother.component.css']
})
export class SchedaotherComponent implements OnInit {

  myPG: Personaggio = new Personaggio;
  myaPG: Basicpg = this.myPG.aPG;

  listaquest: Array<Questrow> = [];

  necro = [];
  taum = [];

  bio = '';
  descrizione = '';
  annotazioni = '';
  StatusPG = 0;

  myFormGroup: FormGroup;

  today: number = (new Date()).getFullYear();

  constructor( private schedaService: SchedaService, public status: Status, private questpx: QuestpxService) { }

  ngOnInit() {
    this.myaPG.URLImg="nopicture.gif";

    this.schedaService.getbio(this.status.otherID)
    .subscribe ( (data: datidabio) => {

      this.bio = data.pg.Background;
      this.descrizione = data.pg.Descrizione;
      this.annotazioni = data.pg.Annotazioni;
      this.StatusPG = data.pg.StatusPG;

      //console.log(data);

    });

    this.schedaService.getpg(this.status.otherID).subscribe( (data: Personaggio) => {

      this.myPG = data;
      this.myaPG = this.myPG.aPG;
      this.myaPG.ModSalute = Number (this.myaPG.ModSalute);

      //console.log()

    });


    if ( this.status.MasterAdmin !== 0 ) {

      this.schedaService.getnecrotaum(this.status.otherID).subscribe ( data => {
        this.necro = data.necro;
        this.taum = data.taum;
      });

      this.questpx.getquest(this.status.otherID).subscribe( (data: Array<Questrow>) => {

        this.listaquest = data;
  
      });

      this.myFormGroup = new FormGroup({
        questFC: new FormControl('', [
          Validators.required
        ]),
  
        pxFC: new FormControl(1, [
          Validators.required,
          Validators.min(1)
        ]),
      });

    }

  }

  assegna(){}

}
