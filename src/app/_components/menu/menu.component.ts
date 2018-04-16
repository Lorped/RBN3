import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../_services/index';
import { ModalService } from '../../_services/index';

import { Router } from '@angular/router';

import { Status } from '../../globals'



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private router: Router, private status: Status , private modalService: ModalService) { }

  ngOnInit() {
  }

  dologout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);

  }

  closemenu() {
    this.status.menuState = 'out';

  }

  openmodal(id: string ){
    this.status.menuState = 'out';
    this.modalService.show(id) ;
  }
}
