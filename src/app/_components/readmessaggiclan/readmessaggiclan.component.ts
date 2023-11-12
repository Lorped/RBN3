import { Component, OnInit, ViewChild } from '@angular/core';
import { MessaggiService , UnMessaggioclan } from '../../_services/index';
import {  Status } from '../../globals';

@Component({
  selector: 'app-readmessaggiclan',
  templateUrl: './readmessaggiclan.component.html',
  styleUrls: ['./readmessaggiclan.component.css']
})
export class ReadmessaggiclanComponent implements OnInit {
  @ViewChild('multilineinput', { static: true }) private mymulti: any;

  listaMsgClan: Array<UnMessaggioclan>;
  testo = '';

  constructor(public status: Status, private messaggiService: MessaggiService) { }

  ngOnInit(): void {
    
    this.caricamessaggi();
  }

  caricamessaggi(){
    this.messaggiService.getmessaggiclan(this.status.clancontattoID)
    .subscribe( data => {
       this.listaMsgClan = data;
       // console.log(this.listaMsg);
       this.messaggiService.contanuovimessaggi(this.status.Userid)
       .subscribe((data) => {
        this.status.Newmsg = data.Newmsg;
       });
    });
  }


  SendMsg(){
    this.messaggiService.sendmessaggioclan(this.status.clancontattoID, this.testo)
    .subscribe( () => {
      this.testo='';
      this.mymulti.nativeElement.innerHTML = '';


      this.caricamessaggi();
  

      
    });
  }



  mykey(event: KeyboardEvent){

    this.testo = this.mymulti.nativeElement.innerText.trim();

    if (this.mymulti.nativeElement.innerHTML == "<br>") {
      this.testo='';
    }

  }

}
