import { Component  } from '@angular/core';
import { AuthenticationService } from '../../_services/index';
import { ModalService } from '../../_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Status } from '../../globals';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  constructor( private authenticationService: AuthenticationService, private router: Router,
    private status: Status, private modalService: ModalService, private route: ActivatedRoute ) { }



  dologout() {
    

    this.status.Alive = false ;
    this.authenticationService.logout().subscribe( ()=> {
      sessionStorage.removeItem('RBN3currentUser');

      if (this.status.forumactivated == true) {
        this.router.navigate( [ '', {outlets: { forum: null } } ] );
        this.router.events.pipe(first(evt => evt instanceof NavigationEnd)).
        subscribe(() => {
          //console.log("nav end");
          this.router.navigate( [ '/login' ] );
        });
      } else {
        //console.log("no nav need");
        this.router.navigate( [ '/login' ] );     
      }
      
    });
    
  }



  openmodal(id: string ) {
    if ( id === 'modalscheda') {
      this.status.schedaon = true ;
    }
    if ( id === 'modalpx') {
      this.status.pxon = true ;
    }
    if ( id === 'modalazioni') {
      this.status.azionion = true ;
    }
    if ( id === 'modalanagrafe') {
      this.status.anagon = true ;
    }
    if ( id === 'modalpoteri') {
      this.status.poterion = true ;
    }
    if ( id === 'modalfinanza') {
      this.status.finanzaon = true ;
    }
    if ( id === 'modalmessaggi') {
      this.status.messaggion = true ;
    }
    if ( id === 'modalforum') {
      this.status.forumon = true ;
      this.router.navigate(
        [ {outlets: {forum: ['forum']}}], {relativeTo: this.route}
      );
      this.status.forumactivated = true;
    }
    
    this.modalService.show(id) ;
  }

  gotomodule(where: string) {
    
    this.status.Alive = false ;
    this.status.Last = 0 ;
    this.router.navigate([where]);
  }
}
