import { Component, OnInit } from '@angular/core';
import { armi , oggettibase, OggettiService } from '../../_services/index';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Status } from '../../globals';

export interface criminal {
  livello: number;
  cash: number;
}

@Component({
  selector: 'app-oggetti',
  templateUrl: './oggetti.component.html',
  styleUrls: ['./oggetti.component.css']
})
export class OggettiComponent implements OnInit{

  armidafuoco: Array<armi> = [];
  armidamischia: Array<armi> = [];
  oggettiesot: Array<oggettibase> = [];
  alloggetti: Array<oggettibase> = [];
  livellocriminalita= 0;
  cash = 0 ;

  constructor (private oggettiservice: OggettiService, private maticonreg: MatIconRegistry, private sanitizer: DomSanitizer, private status: Status) {
    this.maticonreg.addSvgIcon( 'gun' , this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/gun.svg') );
    this.maticonreg.addSvgIcon( 'sword' , this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sword.svg'));
    this.maticonreg.addSvgIcon( 'pentacle' , this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/pentacle.svg'));
  }

  ngOnInit(): void {
    
    this.oggettiservice.getcriminal().subscribe( (data: criminal)=>{
      this.livellocriminalita = Number(data.livello);
      this.cash = Number(data.cash);
    });
    
    this.oggettiservice.getalloggetti().subscribe ( (data: Array<armi>) => {
      this.alloggetti = data;
      //console.log(data);
      for (let i=0; i < data.length; i++){
        data[i].IDtipoOggetto = Number (data[i].IDtipoOggetto);
        data[i].Costo = Number (data[i].Costo);
        data[i].Reperibilita = Number (data[i].Reperibilita);
        data[i].Quantita = Number (data[i].Quantita);
        switch (data[i].IDtipoOggetto) {
          case 1:
          case 2:
            this.armidamischia.push(data[i]);
            break;
          case 3:
            this.armidafuoco.push(data[i]);
            break;
          case 4:
            this.oggettiesot.push(data[i]);
            break;
          default:
            break;
        }
      }
    });
    
  }

  acquista(id: number){
    this.oggettiservice.compra(id).subscribe(()=> {

      const found = this.alloggetti.find( (xx) => xx.IDoggetto === id);

      if (found.IDtipoOggetto === 1 || found.IDtipoOggetto === 2) {
        const idx = this.armidamischia.findIndex( (xx) => xx.IDoggetto === id);
        ++this.armidamischia[idx].Quantita;
        this.cash = this.cash - this.armidamischia[idx].Costo;
          this.status.cash = this.cash;
      }
      if (found.IDtipoOggetto === 3 ) {
        const idx = this.armidafuoco.findIndex( (xx) => xx.IDoggetto === id);
        ++this.armidafuoco[idx].Quantita;
        this.cash = this.cash - this.armidafuoco[idx].Costo;
          this.status.cash = this.cash;
      }
      if (found.IDtipoOggetto === 4 ) {
        const idx = this.oggettiesot.findIndex( (xx) => xx.IDoggetto === id);
        ++this.oggettiesot[idx].Quantita;
        this.cash = this.cash - this.oggettiesot[idx].Costo;
          this.status.cash = this.cash;
      }
      
    });
  }
}
