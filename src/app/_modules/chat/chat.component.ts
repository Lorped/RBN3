import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/observable/interval';

import { myChat, chatrow , ChatService } from '../../_services/index';

import { Status } from '../../globals'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  statuschat: number;
  listachat: Array<chatrow>;

  constructor( private status: Status, private chatservice: ChatService, private route: ActivatedRoute, private router: Router ) { }


  ngOnInit() {
    this.listachat = [];
    var myEmitter =this.route.url.switchMap( (val) =>   {
//       console.log("on init swMap="+this.status.Stanza);
//       console.log(val);
       return  Observable.interval(20000).startWith(1).mergeMapTo(this.chatservice.getchat())
     })

     this.status.Subscriber= myEmitter.subscribe((data: myChat) => {

//      console.log("inside polling chat="+this.status.Stanza);
      this.statuschat=data.Statuschat;
      this.status.Last=data.Last;
      if (this.statuschat==0)  {
        this.listachat=data.Listachat;
        this.status.Last=0;
      } else {
        for (let i = 0; i < data.Listachat.length; i++) {
          this.listachat.push(data.Listachat[i]);
        }
      };
    },
    error => {
      console.log(error);
    });

  }


  GetNow()   {
    console.log("on getNow chat="+this.status.Stanza);

    this.chatservice.getchat()
    .subscribe(data => {

      this.statuschat=data.Statuschat;
      this.status.Last=data.Last;

      if (this.statuschat==0)  {

        this.listachat=data.Listachat;
        this.status.Last=0;

      } else {

        for (let i = 0; i < data.Listachat.length; i++) {
          this.listachat.push(data.Listachat[i]);
        }
      }
    });
  }

}
