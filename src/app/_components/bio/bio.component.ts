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


  descrizione: string;
  annotazioni: string;
  background: string;
  URLImg = 'nopicture.gif';
  ImgLG = 'img400-600.png';

  fileToUpload: File = null;

  constructor( private schedaService: SchedaService, private status: Status  ) { }

  ngOnInit() {

    this.schedaService.getbio(this.status.Userid)
    .subscribe( (data: any) => {
      this.descrizione = data.pg.Descrizione;
      this.annotazioni = data.pg.Annotazioni;
      this.background = data.pg.Background;
      this.URLImg = data.pg.URLImg;
      this.ImgLG = data.pg.ImgLG;
      //console.log(data.pg);
    });

  }
  //fileChange(files: FileList) {
  fileChange(event: any, id: number) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const fileToUpload = files[0];

      this.schedaService.putavatar(fileToUpload, id)
      .subscribe( () => {
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
    this.schedaService.addbio(this.background, this.descrizione, this.annotazioni)
    .subscribe( () => {
      this.bioForm.form.markAsPristine();
    });
  }
}
