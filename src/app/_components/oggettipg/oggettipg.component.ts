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

  constructor(private oggettiservice: OggettiService, public status: Status) {  }

  ngOnInit() {
    

    this.oggettiservice.getoggetti(this.status.Userid).subscribe( (data: Array<posseduti>)=> {
      console.log(data);
      this.oggettiposseduti = data;

      for ( let i = 0 ; i < this.oggettiposseduti.length; i++) {
        this.oggettiposseduti[i].IDoggetto =  Number(this.oggettiposseduti[i].IDoggetto);
        this.oggettiposseduti[i].IDtipoOggetto =  Number(this.oggettiposseduti[i].IDtipoOggetto);
        this.oggettiposseduti[i].Quantita =  Number(this.oggettiposseduti[i].Quantita);
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
        if (this.oggettiindossati[i].Occultabile == 'I' ) {
          this.miadisp.impermeabile = this.oggettiindossati[i].IDoggetto;
          this.miadisp.impermeabile_img = this.oggettiindossati[i].Immagine;
        }
        if (this.oggettiindossati[i].Occultabile == 'G' ) {
          this.miadisp.giacca = this.oggettiindossati[i].IDoggetto;
          this.miadisp.giacca_img = this.oggettiindossati[i].Immagine;
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


  swapout(id: number) {
    // 1 - T1
    // 2 - T2
    // 3 - G
    // 4 - I
    // 5 - N
    console.log("swapout", id);

    switch (id) {
       case 1:
        this.miadisp.tasca1 = 0;
        this.miadisp.tasca1_img = "slot/belt.png";
        break;
      case 2:
        this.miadisp.tasca2 = 0;
        this.miadisp.tasca2_img = "slot/purse.png";
        break;
      case 3:
        this.miadisp.giacca = 0;
        this.miadisp.giacca_img = "slot/jacket.png";
        break;
      case 4:
        this.miadisp.impermeabile = 0;
        this.miadisp.impermeabile_img = "slot/trench.png";
        break;
      case 5:
        this.miadisp.nessuno = 0;
        this.miadisp.nessuno_img = "slot/out.png";
        break;

      default:
        break;
    }
  }

  swapin(id) {
    
    const found = this.oggettiposseduti.find( (xx) => xx.IDoggetto === id);
    

    switch (found.Occultabile) {
      case 'T':
        //console.log(this.miadisp.tasca1);
        //console.log(this.miadisp.tasca2);
        //console.log(id);
        //console.log(found.Quantita);
        if( (this.miadisp.tasca1 !== id && this.miadisp.tasca2 !== id) || found.Quantita>1 ) {
          if (this.miadisp.tasca1 === 0) {
            this.miadisp.tasca1 = found.IDoggetto;
            this.miadisp.tasca1_img = found.Immagine;
          } else {
            this.miadisp.tasca2 = found.IDoggetto;
            this.miadisp.tasca2_img = found.Immagine;
          }
        }
       break;
     case 'G':
       this.miadisp.giacca = found.IDoggetto;
       this.miadisp.giacca_img = found.Immagine;
       break;
     case 'I':
       this.miadisp.impermeabile = found.IDoggetto;
       this.miadisp.impermeabile_img = found.Immagine;
       break;
     case 'N':
       this.miadisp.nessuno = found.IDoggetto;
       this.miadisp.nessuno_img = found.Immagine;
       break;

     default:
       break;
   }
 }
  

  
}
