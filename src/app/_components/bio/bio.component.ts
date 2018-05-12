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
  descrizione: string;
  URLImg: string;

  fileToUpload: File = null;

  constructor( private schedaService: SchedaService, private status: Status  ) { }

  ngOnInit() {

    this.schedaService.getbio(this.status.Userid)
    .subscribe( (data: any) => {
      this.bio = data.pg.Background;
      this.descrizione = data.pg.Descrizione;
      this.URLImg = data.pg.URLImg;
    });

  }
  fileChange(files: FileList) {
    if (files.length > 0) {
      const fileToUpload = files[0];

      this.schedaService.putavatar(fileToUpload)
      .subscribe(data => {
          this.schedaService.getbio(this.status.Userid)
          .subscribe( (data: any) => {
            this.URLImg = data.pg.URLImg;
          });
      }, error => {
        console.log(error);
      });
    }
  }
}
