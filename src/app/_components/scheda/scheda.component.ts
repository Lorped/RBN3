import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../../_services/index';

import { Status } from '../../globals';
import { Background, Attributo, Skill, Disciplina, Basicpg, Personaggio } from '../../globals';


@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.css']
})
export class SchedaComponent implements OnInit {

  myPG: Personaggio = new Personaggio;
  myaPG: Basicpg = this.myPG.aPG;

  necro = [];
  taum = [];

  today: number = (new Date()).getFullYear();

  constructor( private schedaService: SchedaService, private status: Status  ) {
  }

  ngOnInit() {
    this.schedaService.getpg(this.status.Userid)
    .subscribe( (data: Personaggio) => {
      this.myPG = data;
      this.myaPG = this.myPG.aPG;
      console.log("today "+this.today);
      console.log(this.myPG);
    });

    this.schedaService.getnecrotaum(this.status.Userid)
    .subscribe ( data => {
      this.necro = data.necro;
      this.taum = data.taum;
    });


  }




}
