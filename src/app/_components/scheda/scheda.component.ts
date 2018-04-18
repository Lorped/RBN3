import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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


  constructor( private schedaService: SchedaService, private status: Status ) { }

  ngOnInit() {

    this.schedaService.getpg(this.status.Userid)
    .subscribe( (data: Personaggio) => {
      this.myPG = data;
    });

  }



}
