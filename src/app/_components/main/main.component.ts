import { Component, OnInit } from '@angular/core';



import { Status } from '../../globals';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],

})


export class MainComponent implements OnInit {


  constructor( public status: Status ) { }

  ngOnInit() {}




}
