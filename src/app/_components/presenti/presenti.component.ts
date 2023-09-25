import { Component, OnInit } from '@angular/core';
import { EmitterService, ListpresentiService , Presenti } from '../../_services/index';

import { Subscription, interval } from 'rxjs';
import { Status } from '../../globals';

@Component({
  selector: 'app-presenti',
  templateUrl: './presenti.component.html',
  styleUrls: ['./presenti.component.css']
})
export class PresentiComponent implements OnInit {

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  listapresenti: Array<Presenti>;
  numeropresenti: number;

  constructor( private listpresentiService: ListpresentiService, public status: Status , private emitter: EmitterService) { }

  ngOnInit() {

    
    this.listpresentiService.getpresenti()
    .subscribe(( data: Array<Presenti> ) => {
        this.listapresenti = data;
        this.numeropresenti = data.length;
    },
    error => {
      console.log(error);
    });
    
    // IntervalObservable.create(90000)
    this.sub1 = interval(90000)
    .subscribe(() => {
      this.listpresentiService.getpresenti()
      .subscribe(( data: Array<Presenti> ) => {
        this.listapresenti = data;
        this.numeropresenti = data.length;
      });
    });

    this.sub2 = this.emitter.emitOnNavEnd().subscribe( () => {
      
      
      this.listpresentiService.getpresenti()
      .subscribe(( data: Array<Presenti> ) => {
        this.listapresenti = data;
        this.numeropresenti = data.length;
        
      });
    });

    this.sub3 = this.emitter.emitOnNavSkipped().subscribe( () => {
      
      this.listpresentiService.getpresenti()
      .subscribe(( data: Array<Presenti> ) => {
        this.listapresenti = data;
        this.numeropresenti = data.length;      
      });
    });

  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

}
