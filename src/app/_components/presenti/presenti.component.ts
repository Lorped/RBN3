import { Component, OnInit } from '@angular/core';
import { ListpresentiService , presenti } from '../../_services/index';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-presenti',
  templateUrl: './presenti.component.html',
  styleUrls: ['./presenti.component.css']
})
export class PresentiComponent implements OnInit {



  listapresenti: Array<presenti>;
  numeropresenti: number;

  constructor( private listpresentiService: ListpresentiService ) { }

  ngOnInit() {

    this.listpresentiService.getpresenti()
    .subscribe(data => {
        this.listapresenti=data;
        this.numeropresenti=data.length;
    },
    error => {
      console.log(error);
    });

    IntervalObservable.create(90000)
    .subscribe(() => {
      this.listpresentiService.getpresenti()
      .subscribe(data => {
        this.listapresenti=data;
        this.numeropresenti=data.length;
        //console.log(this.listapresenti);
      });
    });
  }

}
