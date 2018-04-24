import { Component, OnInit } from '@angular/core';

import { QuestpxService , Questrow } from '../../_services/index';
import { Logrow, Logpx } from '../../_services/index';


@Component({
  selector: 'app-questpx',
  templateUrl: './questpx.component.html',
  styleUrls: ['./questpx.component.css']
})



export class QuestpxComponent implements OnInit {

  quests: Array<Questrow>;
  mylog = new Logpx;

  constructor ( private questpxservice: QuestpxService ) { }

  ngOnInit() {

    this.questpxservice.getquest()
    .subscribe( (data) => {
        this.quests = data;
    });

    this.questpxservice.getlogpx()
    .subscribe( (data) => {
        this.mylog = data ;
    });

  }

}
