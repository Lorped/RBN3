import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../_services/index';
import { MessaggiService } from '../../_services/index';
import { UnContatto, Status } from '../../globals';

@Component({
  selector: 'app-messaggi',
  templateUrl: './messaggi.component.html',
  styleUrls: ['./messaggi.component.css']
})
export class MessaggiComponent implements OnInit {

  myContatti: Array<UnContatto> = [];

  constructor( private messaggiService: MessaggiService, private status: Status, private modalService: ModalService ) { }

  ngOnInit(): void {

    this.messaggiService.getcontatti(this.status.Userid)
    .subscribe( (data) => {
      //console.log (data);
      this.myContatti = data;

    });

  }

  showmsg(IDX: number, nome: string, url: string){
    this.status.contattoID = IDX ;
    this.status.contattonome = nome ;
    this.status.contattourl = url ;
    this.status.listamsgon = true ;
    this.modalService.show('modallistamsg') ;

  }

}
