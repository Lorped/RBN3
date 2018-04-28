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

  nuovadisciplina =  {IDdisciplina: 0, NomeDisc: '', DiClan: ''} ;



  taum = [];
  Tprincipale = 0;
  Tmaxlev = 0;
  necro = [];
  Nprincipale = 0;
  Nmaxlev = 0;

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

    this.schedaService.getnecrotaum(this.status.Userid)
    .subscribe ( data => {
      this.necro = data.necro;
      this.taum = data.taum;
      this.Tprincipale = data.Tprincipale;
      this.Nprincipale = data.Nprincipale;
      this.Tmaxlev = data.Tmaxlev;
      this.Nmaxlev = data.Nmaxlev;

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
    console.log(this.myPG.listaSkill[skill-1].Livello);
    if ( this.myPG.listaSkill[skill-1].Livello == null || this.myPG.listaSkill[skill-1].Livello == 0){
      this.px = this.px - 3;
    } else {
      this.px = this.px - 2 * this.myPG.listaSkill[skill-1].Livello;
    }
    this.myPG.listaSkill[skill-1].Livello++;
  }

  adddisc() {
    console.log("adddisc ");
    console.log(this.nuovadisciplina);
    let newd = new Disciplina;
    newd.IDdisciplina = this.nuovadisciplina.IDdisciplina;
    newd.NomeDisc = this.nuovadisciplina.NomeDisc;
    newd.DiClan = this.nuovadisciplina.DiClan;
    newd.LivelloDisc = 1;
    this.myPG.listaDiscipline.push(newd);

    for ( let j = 0 ; j < this.newdiscipline.length ; j ++ ) {
      if ( this.newdiscipline[j].IDdisciplina === this.nuovadisciplina.IDdisciplina ) {
        this.newdiscipline.splice(j, 1);
      }
    }

    this.px = this.px - 10 ;
    this.nuovadisciplina =  {IDdisciplina: 0, NomeDisc: '', DiClan: ''} ;
  }

  plustaum(ataum: number) {
    console.log("plustaum "+ataum);
    for (let i = 0; i< this.taum.length ; i++) {
      if (this.taum[i].IDtaum == ataum) {
        this.px = this.px - 4 * this.taum[i].Livello;
        this.taum[i].Livello++;
      }
    }
  }
  plusnecro(anecro: number) {
    console.log("plusnecro "+anecro);
    for (let i = 0; i< this.necro.length ; i++) {
      if (this.necro[i].IDnecro == anecro) {
        this.px = this.px - 4 * this.necro[i].Livello;
        this.necro[i].Livello++;
      }
    }
  }

  plusdisc (disc: number) {
    console.log("plusdisc "+disc);
    for (let i = 0; i< this.myPG.listaDiscipline.length ; i++) {
      if (this.myPG.listaDiscipline[i].IDdisciplina == disc) {
console.log(this.myPG.listaDiscipline[i]);
        this.px = this.px -  this.myPG.listaDiscipline[i].LivelloDisc * (this.myPG.listaDiscipline[i].DiClan == 'S' ? 5 : 7);
        this.myPG.listaDiscipline[i].LivelloDisc++;

        if (disc == 15 ) {  // Taumaturgia
          if ( this.myPG.listaDiscipline[i].LivelloDisc < 6 ) {
            for (let j = 0; j < this.taum.length ; j++) {
              if (this.taum[j].Principale == 'S') {
                this.taum[j].Livello++;
                this.Tmaxlev=this.taum[j].Livello;
              }
            }
          }
        }
        if (disc == 7 ) {  // Taumaturgia
          if ( this.myPG.listaDiscipline[i].LivelloDisc < 6 ) {
            for (let j = 0; j < this.necro.length ; j++) {
              if (this.necro[j].Principale == 'S') {
                this.necro[j].Livello++;
                this.Nmaxlev=this.necro[j].Livello;
              }
            }
          }
        }

      }
    }
  }
}
