import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../_services/index';
import { ModalService } from '../../_services/index';

import { Router } from '@angular/router';

import { Status } from '../../globals';

import { SchedaComponent } from '../scheda/scheda.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private router: Router,
    private status: Status, private modalService: ModalService,  private schedacomponent: SchedaComponent ) { }

  ngOnInit() {
  }

  dologout() {
    this.status.menuState = 'out';
    this.authenticationService.logout();
    this.router.navigate(['/login']);

  }

  closemenu() {
    this.status.menuState = 'out';
  }

  openmodal(id: string ) {
    this.schedacomponent.refreshpg();
    this.status.menuState = 'out';
    this.modalService.show(id) ;
  }
}
