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
  nuovadisciplina = {IDdisciplina: 0, NomeDisc: '', DiClan: ''} ;

  taum = [];
  Tprincipale = 0;
  Tmaxlev = 0;
  necro = [];
  Nprincipale = 0;
  Nmaxlev = 0;

  //
  newnecro = [];
  newtaum = [];

  nuovanecro = {IDnecro: 0, NomeNecro: '', Primaria: 'N'} ;
  nuovataum = {IDtaum: 0, NomeTaum: '', Primaria: 'N'} ;


  //
  listaspesa = [] ;

  // per il modal
  visible = false;
  visibleAnimate = false;

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

    this.schedaService.getnewnecrotaum(this.status.Userid)
    .subscribe ( data => {
console.log(data);
      this.newnecro = data.newnecro;
      this.newtaum = data.newtaum;

    });



  }

  goback () {
    console.log(this.listaspesa);
    //this.show();
    this.location.back();
  }

  addfdv () {
    console.log("addfdv");
    this.listaspesa.push( {x: 'FdV' , y: 0} );

    this.px = this.px - this.myPG.aPG.FdVmax;
    this.myPG.aPG.FdVmax++;
    this.myPG.aPG.FdV++;

  }

  addsentiero () {
    console.log("addsentiero");
    this.listaspesa.push( {x: 'Sentiero' , y: 0} );

    this.px = this.px - 2 * this.myPG.aPG.Valsentiero;
    this.myPG.aPG.Valsentiero++;
  }

  addcoscienza () {
    console.log("addcoscienza");
    this.listaspesa.push( {x: 'Coscienza' , y: 0} );

    this.px = this.px - 2 * this.myPG.aPG.Coscienza;
    this.myPG.aPG.Coscienza++;
  }

  addcoraggio () {
    console.log("addcoraggio");
    this.listaspesa.push( {x: 'Coraggio' , y: 0} );

    this.px = this.px - 2 * this.myPG.aPG.Coraggio;
    this.myPG.aPG.Coraggio++;
  }

  addselfcontrol () {
    console.log("addselfcontrol");
    this.listaspesa.push( {x: 'SelfControl' , y: 0} );

    this.px = this.px - 2 * this.myPG.aPG.SelfControl;
    this.myPG.aPG.SelfControl++;
  }

  addattr(attr: number) {
    console.log("addattr "+attr);
    this.listaspesa.push( {x: 'Attributi' , y: attr} );

    this.px = this.px - 4 * this.myPG.listaAttributi[attr-1].Livello;
    this.myPG.listaAttributi[attr-1].Livello++;
  }

  addskill(skill: number) {
    console.log("addskill "+skill);
    console.log(this.myPG.listaSkill[skill-1].Livello);
    this.listaspesa.push( {x: 'Skill' , y: skill} );


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
    this.listaspesa.push( {x: 'Disciplina' , y: this.nuovadisciplina.IDdisciplina} );

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


  addtaum() {
    console.log("addtaum ");
    console.log(this.nuovataum);
    this.listaspesa.push( {x: 'Taumaturgia' , y: this.nuovataum.IDtaum} );


    this.taum.push({IDtaum: this.nuovataum.IDtaum , NomeTaum: this.nuovataum.NomeTaum, Livello: 1 , Primaria: 'N' });

    for ( let j = 0 ; j < this.newtaum.length ; j ++ ) {
      if ( this.newtaum[j].IDtaum === this.nuovataum.IDtaum ) {
        this.newtaum.splice(j, 1);
      }
    }

    this.px = this.px - 7 ;
    this.nuovataum =  {IDtaum: 0, NomeTaum: '', Primaria: 'N'} ;
  }




  plustaum(ataum: number) {
    console.log("plustaum "+ataum);
    this.listaspesa.push( {x: 'Taum' , y: ataum} );

    for (let i = 0; i< this.taum.length ; i++) {
      if (this.taum[i].IDtaum == ataum) {
        this.px = this.px - 4 * this.taum[i].Livello;
        this.taum[i].Livello++;
      }
    }
  }
  plusnecro(anecro: number) {
    console.log("plusnecro "+anecro);
    this.listaspesa.push( {x: 'Necro' , y: anecro} );

    for (let i = 0; i< this.necro.length ; i++) {
      if (this.necro[i].IDnecro == anecro) {
        this.px = this.px - 4 * this.necro[i].Livello;
        this.necro[i].Livello++;
      }
    }
  }



  plusdisc (disc: number) {
    console.log("plusdisc "+disc);
    this.listaspesa.push( {x: 'Disciplina' , y: disc} );


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



  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
