
import { Component, OnInit } from '@angular/core';
import { SchedaService, finanza } from '../../_services/index';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-finanza',
  templateUrl: './finanza.component.html',
  styleUrls: ['./finanza.component.css']
})
export class FinanzaComponent implements OnInit{

  finanzepg: finanza = new finanza();
  sommamensile = 0;

  constructor ( private schedaservice: SchedaService) {}

  ngOnInit(): void {


    
    this.schedaservice.finanze().subscribe((data)=> {

      this.finanzepg = data;

      this.finanzepg.cash = Number(data.cash);
      this.finanzepg.risorse = Number(data.risorse);
      this.finanzepg.entrate = Number(data.entrate);

      //console.log (this.finanzepg);

      this.sommamensile = Number(this.finanzepg.entrate);
      for ( let i = 0; i < this.finanzepg.mybalance.length ; i++) {
        this.finanzepg.mybalance[i].mensile = Number(this.finanzepg.mybalance[i].mensile);
        this.finanzepg.mybalance[i].livello = Number(this.finanzepg.mybalance[i].livello);
        this.sommamensile = this.sommamensile + this.finanzepg.mybalance[i].mensile;
      }
    });
  }

}
