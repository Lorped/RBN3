import { Component, OnInit } from '@angular/core';

import { QuestpxService , Questrow } from '../../_services/index';
import {  Logpx } from '../../_services/index';
import { Status } from '../../globals';


@Component({
  selector: 'app-questpx',
  templateUrl: './questpx.component.html',
  styleUrls: ['./questpx.component.css']
})



export class QuestpxComponent implements OnInit {

  quests: Array<Questrow>;
  mylog = new Logpx;

  constructor ( private questpxservice: QuestpxService, private status: Status ) { }

  ngOnInit() {

    this.questpxservice.getquest(this.status.Userid)
    .subscribe( (data: Array<Questrow>) => {
        this.quests = data;
    });

    this.questpxservice.getlogpx()
    .subscribe( (data) => {
        this.mylog = data ;
    });

  }

}
