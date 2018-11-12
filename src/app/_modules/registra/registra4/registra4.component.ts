import { Component, OnInit } from '@angular/core';
import { Basicpg, Skill, Attributo, Personaggio, Disciplina, Background } from '../../../globals';
import { Router } from '@angular/router';
import { SignupService } from '../../../_services/signup.service';

@Component({
  selector: 'app-registra4',
  templateUrl: './registra4.component.html',
  styleUrls: ['./registra4.component.css']
})
export class Registra4Component implements OnInit {

  newPG = new Basicpg;
  listaAttributi: Array<Attributo> = [];
  listaSkill: Array<Skill> = [];
  listaBackground: Array<Background> = [];
  listaDiscipline: Array<Disciplina> = [];

  necroPG = { IDnecro: 0 , NomeNecro: '', Acquisibile: 0 , Livello: 0 };
  taumPG = { IDtaum: 0 , NomeTaum: '', Acquisibile: 0 , Livello: 0 };

  newPG_orig = new Basicpg;
  listaAttributi_orig: Array<Attributo> = [];
  listaSkill_orig: Array<Skill> = [];
  listaBackground_orig: Array<Background> = [];
  listaDiscipline_orig: Array<Disciplina> = [];

  px = 15;

  export = false ;

  constructor( private router: Router , private signupservice: SignupService ) { }

  ngOnInit() {

    let data = sessionStorage.getItem('RBN3registration0');
    let datajson = JSON.parse(data);

    this.newPG.Email = datajson.regemail;
    this.newPG.Pass = datajson.passwd;

    data = sessionStorage.getItem('RBN3registration1');
    datajson = JSON.parse(data);

    this.newPG.Nome = datajson.nomePG;
    this.newPG.Cognome = datajson.cognomePG;
    // this.newPG.Concetto = datajson.concettoPG;
    this.newPG.Sesso = datajson.Sesso;
    this.newPG.Eta = datajson.etaPG;
    this.newPG.EtaA = datajson.etaAPG;
    this.newPG.Clan = datajson.clanPG;

    this.listaAttributi = datajson.attributi;

    this.newPG.FdVmax = this.listaAttributi[5].Livello + this.listaAttributi[8].Livello;
    this.newPG.IDsalute = this.listaAttributi[2].Livello + 3;

    data = sessionStorage.getItem('RBN3registration2');
    datajson = JSON.parse(data);

    this.listaSkill = datajson.skill;

    data = sessionStorage.getItem('RBN3registration3');
    datajson = JSON.parse(data);
    this.listaBackground = datajson.bg;
    this.listaDiscipline = datajson.discipline;

    this.newPG.Generazione = 13;
    this.newPG.DescSentiero = datajson.sentieroPG.IDsentiero ;  // Warning non desc ma ID !


    this.newPG_orig = JSON.parse(JSON.stringify(this.newPG));
    this.listaAttributi_orig = JSON.parse(JSON.stringify(this.listaAttributi));
    this.listaSkill_orig = JSON.parse(JSON.stringify(this.listaSkill));
    this.listaBackground_orig = JSON.parse(JSON.stringify(this.listaBackground));
    this.listaDiscipline_orig = JSON.parse(JSON.stringify(this.listaDiscipline));

    this.necroPG = datajson.necroPG;
    this.taumPG = datajson.taumPG;

    if (this.necroPG.IDnecro !== 0) {
      this.necroPG.Livello = this.listaDiscipline[1].LivelloDisc; // da scrievre meglio
    }
    if (this.taumPG.IDtaum !== 0) {
      this.taumPG.Livello = this.listaDiscipline[2].LivelloDisc; // da scrievre meglio
    }

  }

  addattr (attr: number) {
    this.listaAttributi[attr - 1].Livello++;
    this.px = this.px - 5 * this.listaAttributi[attr - 1].Livello;

    this.newPG.FdVmax = this.listaAttributi[5].Livello + this.listaAttributi[8].Livello;
    this.newPG.IDsalute = this.listaAttributi[2].Livello + 3;
  }

  minattr (attr: number) {
    this.px = this.px + 5 * this.listaAttributi[attr - 1].Livello;
    this.listaAttributi[attr - 1].Livello--;

    this.newPG.FdVmax = this.listaAttributi[5].Livello + this.listaAttributi[8].Livello;
    this.newPG.IDsalute = this.listaAttributi[2].Livello + 3;
  }

  addskill (attr: number) {
    this.listaSkill[attr - 1].Livello++;
    this.px = this.px - 3 * this.listaSkill[attr - 1].Livello ;
  }

  minskill (attr: number) {
    this.px = this.px + 3 * this.listaSkill[attr - 1].Livello ;
    this.listaSkill[attr - 1].Livello--;
  }



  plusdisc(disc: number) {
    this.listaDiscipline[disc].LivelloDisc++;
    this.px = this.px - 5 * this.listaDiscipline[disc].LivelloDisc;

    if (this.listaDiscipline[disc].IDdisciplina == 7 ) {
      this.necroPG.Livello++;
    } else if ( this.listaDiscipline[disc].IDdisciplina == 15 ) {
      this.taumPG.Livello++;
    }
  }
  mindisc(disc: number) {
    this.px = this.px + 5 * this.listaDiscipline[disc].LivelloDisc;
    this.listaDiscipline[disc].LivelloDisc--;
    if (this.listaDiscipline[disc].IDdisciplina == 7 ) {
      this.necroPG.Livello--;
    } else if ( this.listaDiscipline[disc].IDdisciplina == 15 ) {
      this.taumPG.Livello--;
    }
  }

  plusbg(bg: number) {
    this.listaBackground[bg].LivelloBG++;
    this.px = this.px - 3;
  }
  minbg(bg: number) {
    this.listaBackground[bg].LivelloBG--;
    this.px = this.px + 3;

    // console.log(this.export);
  }

  goback() {
    this.router.navigate(['/registra/3']);
  }

  goto5() {

    const myobj = {
      'newPG': this.newPG,
      'listaBackground': this.listaBackground,
      'listaDiscipline': this.listaDiscipline,
      'listaAttributi': this.listaAttributi,
      'listaSkill': this.listaSkill,
      'necroPG': this.necroPG,
      'taumPG': this.taumPG,
      'px': this.px
    };

    sessionStorage.setItem('RBN3registration4', JSON.stringify(myobj) );

    this.signupservice.sendregistra(myobj)
    .subscribe( res => {
      this.router.navigate(['/registra/5']);
    });


  }

}
