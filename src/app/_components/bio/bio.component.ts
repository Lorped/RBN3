import { Component, OnInit, ViewChild } from '@angular/core';
import { SchedaService } from '../../_services/index';
import { Status } from '../../globals';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  @ViewChild('bioForm', { static: true }) bioForm: NgForm;

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
      .subscribe(res => {
          this.schedaService.getbio(this.status.Userid)
          .subscribe( (data: any) => {
            this.URLImg = data.pg.URLImg;
          });
      }, error => {
        console.log(error);
      });
    }
  }

  addbio() {
    this.schedaService.addbio(this.bio, this.descrizione)
    .subscribe( (data: any) => {
      this.bioForm.form.markAsPristine();
    });
  }
}
