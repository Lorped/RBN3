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

  constructor( private status: Status, private location: Location, private schedaService: SchedaService, private questpxservice: QuestpxService  ) { }

  ngOnInit() {
    this.schedaService.getpg(this.status.Userid)
    .subscribe( (data: Personaggio) => {
      this.myPG = data;
      this.myaPG = this.myPG.aPG;


      this.questpxservice.getpx()
      .subscribe ( (data: number) => {
        this.px = data;
      });


    });
  }

  goback () {
    this.location.back();
  }
}
