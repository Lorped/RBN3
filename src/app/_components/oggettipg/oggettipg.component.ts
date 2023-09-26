import { Component, OnInit } from '@angular/core';
import { OggettiService, posseduti, disposizione } from '../../_services/index';
import { Status } from '../../globals';

@Component({
  selector: 'app-oggettipg',
  templateUrl: './oggettipg.component.html',
  styleUrls: ['./oggettipg.component.css']
})



export class OggettipgComponent implements OnInit{

  oggettiposseduti: Array<posseduti> = [];
  oggettousato: posseduti = new posseduti();
  oggettiindossati: Array<posseduti> = [];
  
  miadisp = new disposizione();

  constructor(private oggettiservice: OggettiService, public status: Status) {}

  ngOnInit() {
    

    this.oggettiservice.getoggetti(this.status.Userid).subscribe( (data: Array<posseduti>)=> {
      console.log(data);
      this.oggettiposseduti = data;

      for ( let i = 0 ; i < this.oggettiposseduti.length; i++) {
        this.oggettiposseduti[i].IDoggetto =  Number(this.oggettiposseduti[i].IDoggetto);
        this.oggettiposseduti[i].IDtipoOggetto =  Number(this.oggettiposseduti[i].IDtipoOggetto);
      }

      for ( let i = 0 ; i < this.oggettiposseduti.length; i++) {
        if ( this.oggettiposseduti[i].Usato == 'S') {
          this.oggettousato = this.oggettiposseduti[i];
          //console.log(this.oggettousato);
        }
        if ( this.oggettiposseduti[i].Indossato == 'S') {
          this.oggettiindossati.push( this.oggettiposseduti[i]) ;
        }
      }
      //console.log(this.oggettiindossati);

      for ( let i = 0 ; i < this.oggettiindossati.length ; i++){
        if (this.oggettiindossati[i].Occultabile == 'G' ) {
          this.miadisp.giacca = this.oggettiindossati[i].IDoggetto;
          this.miadisp.giacca_img = this.oggettiindossati[i].Immagine;
        }
        if (this.oggettiindossati[i].Occultabile == 'I' ) {
          this.miadisp.impermeabile = this.oggettiindossati[i].IDoggetto;
          this.miadisp.impermeabile_img = this.oggettiindossati[i].Immagine;
        }
        if (this.oggettiindossati[i].Occultabile == 'N' ) {
          this.miadisp.nessuno = this.oggettiindossati[i].IDoggetto;
          this.miadisp.nessuno_img = this.oggettiindossati[i].Immagine;
        }
        if (this.oggettiindossati[i].Occultabile == 'T' && this.miadisp.tasca1 !== 0 ) {
          this.miadisp.tasca2 = this.oggettiindossati[i].IDoggetto;
          this.miadisp.tasca2_img = this.oggettiindossati[i].Immagine;
        }
        if (this.oggettiindossati[i].Occultabile == 'T' && this.miadisp.tasca1 == 0 ) {
          this.miadisp.tasca1 = this.oggettiindossati[i].IDoggetto;
          this.miadisp.tasca1_img = this.oggettiindossati[i].Immagine;
        }

      }



    });
    
  }

  
}
