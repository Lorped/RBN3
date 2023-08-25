import { Component, OnInit } from '@angular/core';
import { MessaggiService } from '../../_services/index';
import { Messaggi, Status } from '../../globals';

@Component({
  selector: 'app-readmessaggi',
  templateUrl: './readmessaggi.component.html',
  styleUrls: ['./readmessaggi.component.css']
})
export class ReadmessaggiComponent implements OnInit {

  listaMsg: Array<Messaggi>;

  constructor( private status: Status, private messaggiService: MessaggiService) { }

  ngOnInit(): void {
    console.log("contatto id ", this.status.contattoID);
    
    this.messaggiService.getmessaggi(this.status.contattoID)
    .subscribe( data => {
       this.listaMsg = data;
       console.log(this.listaMsg);
    });
  }


  caricamessaggi(){
       this.messaggiService.getmessaggi(this.status.contattoID)
       .subscribe( data => {
          this.listaMsg = data;
          console.log(this.listaMsg);
       });
  }
}
