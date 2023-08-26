import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { MessaggiService } from '../../_services/index';
import { Messaggi, Status } from '../../globals';

@Component({
  selector: 'app-readmessaggi',
  templateUrl: './readmessaggi.component.html',
  styleUrls: ['./readmessaggi.component.css']
})
export class ReadmessaggiComponent implements OnInit {
  @ViewChild('multilineinput', { static: true }) private mymulti: any;

  listaMsg: Array<Messaggi>;
  testo = '';

  constructor( private status: Status, private messaggiService: MessaggiService) { }

  ngOnInit(): void {
    //console.log("contatto id ", this.status.contattoID);


    
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
          // console.log(this.listaMsg);
       });
  }

  SendMsg(){
    this.messaggiService.sendmessaggio(this.status.contattoID, this.testo)
    .subscribe( (data) => {
      this.testo='';
      this.mymulti.nativeElement.innerHTML = '';
      this.caricamessaggi();
    });
  }

  cancellamsg(id: number){
    //console.log (id);
    this.messaggiService.cancmsg(id)
    .subscribe( (data) => {

      this.messaggiService.getcontatti(this.status.Userid)
      .subscribe( (data) => {
        //console.log (data);
        this.status.myContatti = data;
      });
  
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