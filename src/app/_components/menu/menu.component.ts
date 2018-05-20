import { Component, OnInit  } from '@angular/core';

import { AuthenticationService } from '../../_services/index';
import { ModalService } from '../../_services/index';

import { Router } from '@angular/router';

import { Status } from '../../globals';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private router: Router,
    private status: Status, private modalService: ModalService  ) { }

  ngOnInit() {
  }

  dologout() {
    this.status.menuState = 'out';
    this.status.Alive = false ;
    this.authenticationService.logout();
    this.router.navigate(['/login']);

  }

  closemenu() {
    this.status.menuState = 'out';
  }

  openmodal(id: string ) {
    if ( id === 'modalscheda') {
      this.status.schedaon = true ;
    }
    if ( id === 'modalpx') {
      this.status.pxon = true ;
    }
    if ( id === 'modalbio') {
      this.status.bioon = true ;
    }
    if ( id === 'modalanagrafe') {
      this.status.anagon = true ;
    }
    this.status.menuState = 'out';
    this.modalService.show(id) ;
  }

  gotomodule(where: string) {
    this.status.menuState = 'out';
    this.status.Alive = false ;
    this.status.Last = 0 ;
    this.router.navigate([where]);
  }
}
