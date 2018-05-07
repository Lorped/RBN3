import { Component, OnInit } from '@angular/core';
import { Basicpg, Skill, Attributo, Personaggio, Disciplina, Background } from '../../../globals';

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

  necro = [];
  taum = [];

  constructor() { }

  ngOnInit() {

    let data = sessionStorage.getItem('RBN3registration0');
    let datajson = JSON.parse(data);

    this.newPG.Email = datajson.regemail;
    this.newPG.Pass = datajson.passwd;

    data = sessionStorage.getItem('RBN3registration1');
    datajson = JSON.parse(data);

    this.newPG.Nome = datajson.nomePG;
    this.newPG.Cognome = datajson.cognomePG;
    this.newPG.Natura = datajson.naturaPG;
    this.newPG.Carattere = datajson.caratterePG;
    this.newPG.Sesso = datajson.Sesso;
    this.newPG.Eta = datajson.etaPG;
    this.newPG.EtaA = datajson.etaAPG;

    this.listaAttributi = datajson.attributi;

    data = sessionStorage.getItem('RBN3registration2');
    datajson = JSON.parse(data);

    this.listaSkill = datajson.skill;

    data = sessionStorage.getItem('RBN3registration3');
    datajson = JSON.parse(data);
  console.log(data);
    this.listaBackground = datajson.bg;
    this.listaDiscipline = datajson.discipline;

    this.newPG.Generazione = 13;


    this.newPG.Coscienza = datajson.coscienza;
    this.newPG.Coraggio = datajson.coraggio;
    this.newPG.SelfControl = datajson.selfcontrol;
    this.newPG.Valsentiero = this.newPG.Coscienza + this.newPG.SelfControl;
    this.newPG.FdVmax = this.newPG.Coraggio;



  }

}
