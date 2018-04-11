import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/mergeMapTo';
import 'rxjs/add/operator/takeWhile';

import { takeWhile } from 'rxjs/operators';

import { myChat, chatrow , ChatService, ListpresentiService, PostService, presenti } from '../../_services/index';

import { Status } from '../../globals'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  statuschat: number;
  listachat: Array<chatrow>;

  // per il form di inserimento
  listapg: Array<presenti>;
  testo = '';
  Destinatario = 0 ;

  constructor( private status: Status, private chatservice: ChatService, private postservice: PostService,  private listpresentiservice: ListpresentiService, private route: ActivatedRoute, private router: Router ) { }


  ngOnInit() {


    this.listachat = [];
    this.status.Alive = true;

    var Emitter=this.route.url.switchMap( (val) =>   {
      this.Destinatario=0;
      return TimerObservable.create(0, 20000)
        .takeWhile(() => this.status.Alive)
    });

    Emitter.subscribe((val) => {
      this.chatservice.getchat().subscribe((data: myChat) => {

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
      });

      this.listpresentiservice.getpginstanza(this.status.Stanza, this.status.Userid)
      .subscribe((data: Array<presenti>) => {
        this.listapg=data;
      })

    })
  }


  GetNow()   {

    this.postservice.postchat(this.testo, this.Destinatario)
    .subscribe( () => {
      this.testo="";
      this.chatservice.getchat()
      .subscribe((data: myChat) => {

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
    });


  }

}
