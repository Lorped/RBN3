import { Component, OnInit } from '@angular/core';
import { SchedaService } from '../../_services/index';
import { Status } from '../../globals';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {

  bio: string;
  annotazioni: string;
  URLImg: string;

  constructor( private schedaService: SchedaService, private status: Status  ) { }

  ngOnInit() {

    this.schedaService.getbio(this.status.Userid)
    .subscribe( (data: any) => {
      this.bio = data.pg.Background;
      this.annotazioni = data.pg.Annotazioni;
      this.URLImg = data.pg.URLImg;
    });

  }

}
