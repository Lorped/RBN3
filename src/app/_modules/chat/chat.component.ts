import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeWhile';
// import { takeWhile } from 'rxjs/operators';

import { MyChat, Chatrow , ChatService, ListpresentiService, PostService, Presenti } from '../../_services/index';

import { Status } from '../../globals';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewChecked {
@ViewChild('chatdiv') private myScrollContainer: ElementRef;
@ViewChild('ca') private mycheckadmin: ElementRef;
@ViewChild('cm') private mycheckmaster: ElementRef;

  statuschat = 0;
  listachat: Array<Chatrow>;

  // per il form di inserimento
  listapg: Array<Presenti>;
  testo = '';
  Destinatario = 0 ;
  location = '';
  checkadmin: boolean;
  checkmaster: boolean;
  localMaster = 'hidden';
  localAdmin = 'hidden';


  constructor( private status: Status, private chatservice: ChatService, private postservice: PostService,
    private listpresentiservice: ListpresentiService, private route: ActivatedRoute, private router: Router ) { }


  ngOnInit() {

    // console.log("dentro chat component");

    if (this.status.MasterAdmin > 1) { this.localAdmin = 'visible'; }
    if (this.status.MasterAdmin > 0) { this.localMaster = 'visible'; }

    this.listachat = [];
    this.status.Alive = true;

    const Emitter = this.route.url.switchMap( (val) =>   {
      // console.log("dentro switchmap"+this.status.Stanza);

      this.checkadmin = false;
      this.checkmaster = false;
      this.mycheckadmin.nativeElement.checked = this.checkadmin;
      this.mycheckmaster.nativeElement.checked = this.checkmaster;

      this.status.Alive = true;

      this.listachat = [];
      this.listachat.length = 0;
      this.Destinatario = 0;
      this.location = '';

      return TimerObservable.create(0, 20000)
        .takeWhile(() => this.status.Alive);
    });

    Emitter.subscribe((val) => {

      this.chatservice.getchat().subscribe((data: MyChat) => {
        this.dostuffwithdata(data);
        this.scrollToBottom();
      });

      this.listpresentiservice.getpginstanza(this.status.Stanza, this.status.Userid)
      .subscribe((data: Array<Presenti>) => {
        this.listapg = data;
      });
    });
  }


  GetNow()   {

    this.postservice.postchat( this.testo, this.Destinatario, this.location, this.checkmaster, this.checkadmin)
    .subscribe( () => {
      this.testo = '';
      this.chatservice.getchat()
      .subscribe((data: MyChat) => {

        this.dostuffwithdata(data);
        this.scrollToBottom();

        this.mycheckadmin.nativeElement.checked = this.checkadmin;
        this.mycheckmaster.nativeElement.checked = this.checkmaster;

      });
    });


  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }


  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  radiox(): void {

    if (this.mycheckadmin.nativeElement.checked === true) {
      this.mycheckmaster.nativeElement.checked = false;
      this.checkmaster = false;
    }
  }
  radioy(): void {

    if (this.mycheckmaster.nativeElement.checked === true) {
      this.mycheckadmin.nativeElement.checked = false;
      this.checkadmin = false;
    }
  }

  svuota(): void {
    if ( confirm('Stai per svotare la chat. Sei sicuro?') ) {
      this.postservice.svuota().subscribe( () => {
        this.chatservice.getchat().subscribe((data: MyChat) => {
          this.dostuffwithdata(data);
          this.scrollToBottom();
        });
      });
    }
  }

  dostuffwithdata( data: MyChat) {

    this.statuschat = Number (data.Statuschat);
    this.status.Last = data.Last;
    if (this.statuschat === 0)  {
      this.listachat = data.Listachat;
      this.status.Last = 0;
    } else {
      for (let i = 0; i < data.Listachat.length; i++) {
        if ( data.Listachat[i].Locazione !== '' ) {
          data.Listachat[i].Testo = '[' + data.Listachat[i].Locazione + '] ' + data.Listachat[i].Testo ;
        }
        if ( data.Listachat[i].Tipo === 'A' || data.Listachat[i].Tipo === 'M' ) {
          data.Listachat[i].Mittente = '';
        }
        this.listachat.push(data.Listachat[i]);
      }
    }
  }
}
