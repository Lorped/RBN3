import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  visible = [false , false];
  visibleAnimate = [false, false];

  constructor( private http: HttpClient, private status: Status, private location: Location,
    private schedaService: SchedaService, private questpxservice: QuestpxService  ) { }

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
      this.newnecro = data.newnecro;
      this.newtaum = data.newtaum;

    });

    this.show(0);

  }

  indietro() {
    if (this.listaspesa.length > 0 ) {
      this.show(1);
    } else {
      this.location.back();
    }

  }
  goback () {
    this.location.back();
  }

  save_goback () {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    for (let i = 0 ; i < this.listaspesa.length ; i++) {
      this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/' + this.listaspesa[i].x , {
        token: user,
        y: this.listaspesa[i].y ,
        z: this.listaspesa[i].z
      }).subscribe();
    }
    this.location.back();
  }

  addfdv () {
    this.listaspesa.push( {x: 'addfdv.php' , y: 0, z: 'Forza di Volontà'} );

    this.px = this.px - this.myPG.aPG.FdVmax;
    this.myPG.aPG.FdVmax++;
    this.myPG.aPG.FdV++;

  }

  addsentiero () {
    this.listaspesa.push( {x: 'addsentiero.php' , y: 0, z: 'Sentiero'} );

    this.px = this.px - 2 * this.myPG.aPG.Valsentiero;
    this.myPG.aPG.Valsentiero++;
  }

/* **********
  addcoscienza () {
    this.listaspesa.push( {x: 'addcoscienza.php' , y: 0, z: 'Coscienza'} );

    this.px = this.px - 2 * this.myPG.aPG.Coscienza;
    this.myPG.aPG.Coscienza++;
  }

  addcoraggio () {
    this.listaspesa.push( {x: 'addcoraggio.php' , y: 0, z: 'Coraggio'} );

    this.px = this.px - 2 * this.myPG.aPG.Coraggio;
    this.myPG.aPG.Coraggio ++;
  }

  addselfcontrol () {
    this.listaspesa.push( {x: 'addselfcontrol.php' , y: 0, z: 'Self Control'} );

    this.px = this.px - 2 * this.myPG.aPG.SelfControl;
    this.myPG.aPG.SelfControl++;
  }

********** */

  addattr (attr: number) {
    this.listaspesa.push( {x: 'addattr.php' , y: attr, z: this.myPG.listaAttributi[attr - 1].NomeAttributo } );

    this.px = this.px - 4 * this.myPG.listaAttributi[attr - 1].Livello;
    this.myPG.listaAttributi[attr - 1].Livello++;
  }

  addskill (skill: number) {
    this.listaspesa.push( {x: 'addskill.php' , y: skill, z: this.myPG.listaSkill[skill - 1].NomeSkill } );


    if ( this.myPG.listaSkill[skill - 1].Livello === null || this.myPG.listaSkill[skill - 1].Livello === 0) {
      this.px = this.px - 3;
    } else {
      this.px = this.px - 2 * this.myPG.listaSkill[skill - 1].Livello;
    }
    this.myPG.listaSkill[skill - 1].Livello++;
  }

  adddisc () {
    this.listaspesa.push( {x: 'adddisc.php' , y: this.nuovadisciplina.IDdisciplina , z: this.nuovadisciplina.NomeDisc} );

    const newd = new Disciplina;
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


  addtaum () {
    this.listaspesa.push( {x: 'addtaum.php' , y: this.nuovataum.IDtaum, z: this.nuovataum.NomeTaum} );

    this.taum.push({IDtaum: this.nuovataum.IDtaum , NomeTaum: this.nuovataum.NomeTaum, Livello: 1 , Primaria: 'N' });

    for ( let j = 0 ; j < this.newtaum.length ; j ++ ) {
      if ( this.newtaum[j].IDtaum === this.nuovataum.IDtaum ) {
        this.newtaum.splice(j, 1);
      }
    }

    this.px = this.px - 7 ;
    this.nuovataum =  {IDtaum: 0, NomeTaum: '', Primaria: 'N'} ;
  }

  addnecro () {
    this.listaspesa.push( {x: 'addnecro.php' , y: this.nuovanecro.IDnecro, z: this.nuovanecro.NomeNecro} );

    this.necro.push({IDnecro: this.nuovanecro.IDnecro , NomeNecro: this.nuovanecro.NomeNecro, Livello: 1 , Primaria: 'N' });
    for ( let j = 0 ; j < this.newnecro.length ; j ++ ) {
      if ( this.newnecro[j].IDnecro === this.nuovanecro.IDnecro ) {
        this.newnecro.splice(j, 1);
      }
    }

    this.px = this.px - 7 ;
    this.nuovanecro =  {IDnecro: 0, NomeNecro: '', Primaria: 'N'} ;
  }



  plustaum (ataum: number) {
    for (let i = 0; i < this.taum.length ; i++) {
      if (this.taum[i].IDtaum === ataum) {

        this.listaspesa.push( {x: 'plustaum.php' , y: ataum, z: this.taum[i].NomeTaum } );

        this.px = this.px - 4 * this.taum[i].Livello;
        this.taum[i].Livello++;
      }
    }
  }

  plusnecro (anecro: number) {
    for (let i = 0; i < this.necro.length ; i++) {
      if (this.necro[i].IDnecro === anecro) {

        this.listaspesa.push( {x: 'plusnecro.php' , y: anecro, z: this.necro[i].NomeNecro } );

        this.px = this.px - 4 * this.necro[i].Livello;
        this.necro[i].Livello++;
      }
    }
  }



  plusdisc (disc: number) {
    for (let i = 0; i < this.myPG.listaDiscipline.length ; i++) {
      if (this.myPG.listaDiscipline[i].IDdisciplina === disc) {

        this.listaspesa.push( {x: 'plusdisc.php' , y: disc, z: this.myPG.listaDiscipline[i].NomeDisc} );

        this.px = this.px -  this.myPG.listaDiscipline[i].LivelloDisc * (this.myPG.listaDiscipline[i].DiClan === 'S' ? 5 : 7);
        this.myPG.listaDiscipline[i].LivelloDisc++;

        if (disc === 15 ) {  // Taumaturgia
          if ( this.myPG.listaDiscipline[i].LivelloDisc < 6 ) {
            for (let j = 0; j < this.taum.length ; j++) {
              if (this.taum[j].Principale === 'S') {
                this.taum[j].Livello++;
                this.Tmaxlev = this.taum[j].Livello;
              }
            }
          }
        }
        if (disc === 7 ) {  // Taumaturgia
          if ( this.myPG.listaDiscipline[i].LivelloDisc < 6 ) {
            for (let j = 0; j < this.necro.length ; j++) {
              if (this.necro[j].Principale === 'S') {
                this.necro[j].Livello++;
                this.Nmaxlev = this.necro[j].Livello;
              }
            }
          }
        }

      }
    }
  }



  public show(i: number): void {
    this.visible[i] = true;
    setTimeout(() => this.visibleAnimate[i] = true, 100);
  }

  public hide(i: number): void {
    this.visibleAnimate[i] = false;
    setTimeout(() => this.visible[i] = false, 300);
  }

  public onContainerClicked(event: MouseEvent, i: number): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide(i);
    }
  }
}
