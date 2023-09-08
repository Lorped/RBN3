import { Component, OnInit  } from '@angular/core';
import { AuthenticationService } from '../../_services/index';
import { ModalService } from '../../_services/index';
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from '../../globals';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private router: Router,
    private status: Status, private modalService: ModalService, private route: ActivatedRoute ) { }

  ngOnInit() {
  }

  dologout() {
    
    this.status.Alive = false ;
    this.authenticationService.logout();
    this.router.navigate(['/login']);

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
    if ( id === 'modalpoteri') {
      this.status.poterion = true ;
    }
    if ( id === 'modalsceltapoteri') {
      this.status.sceltapoterion = true ;
    }
    if ( id === 'modalmessaggi') {
      this.status.messaggion = true ;
    }
    if ( id === 'modalforum') {
      this.status.forumon = true ;
      this.router.navigate(
        [ {outlets: {forum: ['forum']}}], {relativeTo: this.route}
      );
    }
    
    this.modalService.show(id) ;
  }

  gotomodule(where: string) {
    
    this.status.Alive = false ;
    this.status.Last = 0 ;
    this.router.navigate([where]);
  }
}
