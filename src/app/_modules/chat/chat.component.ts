import { Component, OnInit } from '@angular/core';
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


  constructor( private status: Status, private chatservice: ChatService ) { }

  ngOnInit() {

    this.status.Last=0;
    this.chatservice.getchat()
    .subscribe((data: myChat) => {
        this.statuschat=data.Statuschat;
        this.listachat=data.Listachat;
        console.log(this.listachat);
    },
    error => {
      console.log(error);
    });
  }

}
