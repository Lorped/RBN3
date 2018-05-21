import { Component, OnInit } from '@angular/core';
import { AnagrafeRow, AnagrafeService } from '../../_services/index';

@Component({
  selector: 'app-anagrafe',
  templateUrl: './anagrafe.component.html',
  styleUrls: ['./anagrafe.component.css']
})
export class AnagrafeComponent implements OnInit {

  anagrafe: Array<AnagrafeRow> = [];
  order = 1;
  propertyName = '';

  constructor( private anagrafeservice: AnagrafeService,  ) { }

  ngOnInit() {
    this.anagrafeservice.anagrafe()
    .subscribe( (data: any) => {
      this.anagrafe = data;
      console.log(this.anagrafe);
    });
  }

  sortBy ( prop: string) {
    this.propertyName = prop;
    this.anagrafe.sort ( (a, b) => {
      return (a[prop] > b[prop]) ? this.order : (-1) * this.order ;
    });
    this.order = -1 * this.order;

    console.log(this.order);
  }

}
