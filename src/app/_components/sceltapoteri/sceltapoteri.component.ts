import { Component, OnInit } from '@angular/core';

import { SchedaService } from '../../_services/index';

import { SceltaPotere, SceltaPotereDisc } from '../../globals';

@Component({
  selector: 'app-sceltapoteri',
  templateUrl: './sceltapoteri.component.html',
  styleUrls: ['./sceltapoteri.component.css']
})
export class SceltapoteriComponent implements OnInit {

  myListaSceltaPotere: Array<SceltaPotereDisc> = [];
  i = 0 ;
  reset = 0;
  listaspesa = [] ;

  // per il modal
  visible = [false , false];
  visibleAnimate = [false, false];

  constructor( private schedaService: SchedaService ) { }

  ngOnInit() {

    this.schedaService.getsceltapoteri()
    .subscribe( (data) => {
      //console.log (data);
      this.myListaSceltaPotere = data;
      //console.log (this.myListaSceltaPotere);

    });

  }

  doreset(){
    this.schedaService.getsceltapoteri()
    .subscribe( (data) => {
      // console.log (data);
      this.myListaSceltaPotere = data;
      // console.log (this.myListaSceltaPotere);

    });
    this.reset = 0;
    this.listaspesa = [];
  }

  selezionapot( potx, ix ) {
    this.reset = 1;
    // console.log("disciplina " + ix);
    // console.log("potere " + potx);



    // console.log( this.myListaSceltaPotere[ix].NomeDisc );
    for (let i = 0 ; i < this.myListaSceltaPotere[ix].pot.length ; i++ ) {
      if (this.myListaSceltaPotere[ix].pot[i].IDpotere == potx) {
        // console.log( this.myListaSceltaPotere[ix].pot[i].NomePotere );

        this.listaspesa.push( {disc: this.myListaSceltaPotere[ix].NomeDisc , IDpotere: this.myListaSceltaPotere[ix].pot[i].IDpotere,
          NomePotere: this.myListaSceltaPotere[ix].pot[i].NomePotere} );

        if (this.myListaSceltaPotere[ix].pot[i].preso == 1 ) {
          this.myListaSceltaPotere[ix].pot[i].preso = 0;
          this.myListaSceltaPotere[ix].numpresi -- ;
        } else {
          this.myListaSceltaPotere[ix].pot[i].preso = 1;
          this.myListaSceltaPotere[ix].numpresi ++ ;
        }
      }
    }

  }

  public show(i: number): void {
    this.visible[i] = true;
    setTimeout(() => this.visibleAnimate[i] = true, 100);
  }

  public hide(i: number): void {
    this.visibleAnimate[i] = false;
    setTimeout(() => this.visible[i] = false, 300);
  }

  public onContainerClicked(event: MouseEvent, i: number): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide(i);
    }
  }

  dosave() {
    // console.log ( this.listaspesa);
    this.show(1);
  }

  goback() {
    this.hide(1);
  }

  save_goback() {
    this.schedaService.addpoteri(this.listaspesa)
    .subscribe( (data) => {
      this.doreset();
      this.hide(1);
    });


  }

}
