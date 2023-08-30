import { Component, OnInit } from '@angular/core';
import { ListpresentiService , Presenti } from '../../_services/index';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Status } from '../../globals';

@Component({
  selector: 'app-presenti',
  templateUrl: './presenti.component.html',
  styleUrls: ['./presenti.component.css']
})
export class PresentiComponent implements OnInit {



  listapresenti: Array<Presenti>;
  numeropresenti: number;

  constructor( private listpresentiService: ListpresentiService, public status: Status ) { }

  ngOnInit() {

    
    this.listpresentiService.getpresenti()
    .subscribe(data => {
        this.listapresenti = data;
        this.numeropresenti = data.length;
        //console.log(this.listapresenti);
        //console.log(this.status.Ongame);
    },
    error => {
      console.log(error);
    });
    
    IntervalObservable.create(90000)
    .subscribe(() => {
      this.listpresentiService.getpresenti()
      .subscribe(data => {
        this.listapresenti = data;
        this.numeropresenti = data.length;
      });
    });
  }

}
