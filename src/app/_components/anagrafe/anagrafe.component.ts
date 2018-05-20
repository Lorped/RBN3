import { Component, OnInit } from '@angular/core';
import { AnagrafeRow, AnagrafeService } from '../../_services/index';

@Component({
  selector: 'app-anagrafe',
  templateUrl: './anagrafe.component.html',
  styleUrls: ['./anagrafe.component.css']
})
export class AnagrafeComponent implements OnInit {

  anagrafe: Array<AnagrafeRow> = [];

  constructor( private anagrafeservice: AnagrafeService,  ) { }

  ngOnInit() {
    this.anagrafeservice.anagrafe()
    .subscribe( (data: any) => {
      this.anagrafe = data;
      console.log(this.anagrafe);
    });
  }

}
