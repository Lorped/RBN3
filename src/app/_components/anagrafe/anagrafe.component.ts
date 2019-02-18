import { Component, OnInit } from '@angular/core';
import { AnagrafeRow, AnagrafeService } from '../../_services/index';

import { ModalService } from '../../_services/index';

import { Status } from '../../globals';

@Component({
  selector: 'app-anagrafe',
  templateUrl: './anagrafe.component.html',
  styleUrls: ['./anagrafe.component.css']
})
export class AnagrafeComponent implements OnInit {

  anagrafe: Array<AnagrafeRow> = [];
  order = 1;
  propertyName = '';

  constructor( private anagrafeservice: AnagrafeService, private modalService: ModalService , private status: Status  ) { }

  ngOnInit() {
    this.anagrafeservice.anagrafe()
    .subscribe( (data: any) => {
      this.anagrafe = data;
      // console.log(this.anagrafe);
    });
  }

  sortBy ( prop: string) {
    this.propertyName = prop;
    this.anagrafe.sort ( (a, b) => {
      return (a[prop] > b[prop]) ? this.order : (-1) * this.order ;
    });
    this.order = -1 * this.order;

    // console.log(this.order);
  }


  showoth  (id: number) {
    if ( id === this.status.Userid ) {
      this.status.schedaon = true ;
      this.modalService.show('modalscheda') ;
    } else {
      this.status.schedaothon = true ;
      this.status.otherID = id ;
      this.modalService.show('modalschedaoth') ;
    }
  }


}
