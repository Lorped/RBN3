import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SchedaService } from '../../_services/index';
import { QuestpxService } from '../../_services/index';

import { Status } from '../../globals';
import { Background, Attributo, Skill, Disciplina, Basicpg, Personaggio } from '../../globals';



@Component({
  selector: 'app-spesapx',
  templateUrl: './spesapx.component.html',
  styleUrls: ['./spesapx.component.css']
})
export class SpesapxComponent implements OnInit {

  myPG: Personaggio = new Personaggio;
  myaPG: Basicpg = this.myPG.aPG;

  px = 0 ;

  newdiscipline = [];

  nuovadisciplina = 0 ;

  constructor( private status: Status, private location: Location, private schedaService: SchedaService, private questpxservice: QuestpxService  ) { }

  ngOnInit() {
    this.schedaService.getpg(this.status.Userid)
    .subscribe( (data: Personaggio) => {
      this.myPG = data;
      this.myaPG = this.myPG.aPG;
    });

    this.questpxservice.getpx()
    .subscribe ( (data: number) => {
      this.px = data;
    });

    this.schedaService.getnewdiscipline(this.status.Userid)
    .subscribe ( data => {
      this.newdiscipline = data;
console.log(this.newdiscipline);
    });
  }

  goback () {
    this.location.back();
  }

  addfdv () {
    console.log("addfdv");
    this.px = this.px - this.myPG.aPG.FdVmax;
    this.myPG.aPG.FdVmax++;
    this.myPG.aPG.FdV++;

  }

  addsentiero () {
    console.log("addsentiero");
    this.px = this.px - 2 * this.myPG.aPG.Valsentiero;
    this.myPG.aPG.Valsentiero++;
  }

  addcoscienza () {
    console.log("addcoscienza");
    this.px = this.px - 2 * this.myPG.aPG.Coscienza;
    this.myPG.aPG.Coscienza++;
  }

  addcoraggio () {
    console.log("addcoraggio");
    this.px = this.px - 2 * this.myPG.aPG.Coraggio;
    this.myPG.aPG.Coraggio++;
  }

  addselfcontrol () {
    console.log("addselfcontrol");
    this.px = this.px - 2 * this.myPG.aPG.SelfControl;
    this.myPG.aPG.SelfControl++;
  }

  addattr(attr: number) {
    console.log("addattr "+attr);
    this.px = this.px - 4 * this.myPG.listaAttributi[attr-1].Livello;
    this.myPG.listaAttributi[attr-1].Livello++;
  }

  addskill(skill: number) {
    console.log("addskill "+skill);
    if ( this.myPG.listaSkill[skill-1].Livello == 0 ){
      this.px = this.px - 3;
    } else {
      this.px = this.px - 2 * this.myPG.listaSkill[skill-1].Livello;
    }
    this.myPG.listaSkill[skill-1].Livello++;
  }

  adddisc() {
    console.log("adddisc "+this.nuovadisciplina);
  }
}
