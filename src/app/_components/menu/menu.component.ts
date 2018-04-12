import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService, private router: Router ) { }

  ngOnInit() {
  }

  dologout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);

  }
}
