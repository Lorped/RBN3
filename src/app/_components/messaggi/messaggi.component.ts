import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../_services/index';
import { MessaggiService } from '../../_services/index';
import { UnContatto,  Status } from '../../globals';

@Component({
  selector: 'app-messaggi',
  templateUrl: './messaggi.component.html',
  styleUrls: ['./messaggi.component.css']
})
export class MessaggiComponent implements OnInit {

  listacont: Array<UnContatto>;

  constructor( private messaggiService: MessaggiService, public status: Status, private modalService: ModalService ) { }

  ngOnInit(): void {

    this.messaggiService.getcontatti(this.status.Userid)
    .subscribe( (data) => {
      //console.log (data);
      this.status.myContatti = data;


    });

  }

  showmsg(IDX: number, nome: string, url: string){
    this.status.contattoID = IDX ;
    this.status.contattonome = nome ;
    this.status.contattourl = url ;
    this.status.listamsgon = true ;

    for ( var j = 0 ; j< this.status.myContatti.length ; j++) {
      if ( this.status.myContatti[j].IDX == this.status.contattoID ) {
        this.status.myContatti[j].Nuovi = 0 ;
      }
    }

    this.modalService.show('modallistamsg') ;

  }

}
