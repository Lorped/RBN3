import { Component, OnInit } from '@angular/core';

import { SchedaService } from '../../_services/index';

@Component({
  selector: 'app-sceltapoteri',
  templateUrl: './sceltapoteri.component.html',
  styleUrls: ['./sceltapoteri.component.css']
})
export class SceltapoteriComponent implements OnInit {

  myListaSceltaPotere: Array<SceltaPotereDisc> = [];

  constructor( private schedaService: SchedaService ) { }

  ngOnInit() {

    this.schedaService.getsceltapoteri()
    .subscribe( (data) => {
      console.log (data);
      this.myListaSceltaPotere = data;
      console.log (this.myListaSceltaPotere);

    });

  }

}
