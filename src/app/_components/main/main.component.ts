import { Component } from '@angular/core';



import { Status } from '../../globals';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],

})


export class MainComponent  {


  constructor( public status: Status ) { }






}
