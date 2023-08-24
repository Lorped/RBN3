import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';


import { Status } from '../../globals';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'    // Mettere a 100% per il menù a dx , -100% per menù a sx
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})


export class MainComponent implements OnInit {


  constructor( public status: Status ) { }

  ngOnInit() {}

  toggleMenu() {
    this.status.menuState = this.status.menuState === 'out' ? 'in' : 'out';
  }



}
