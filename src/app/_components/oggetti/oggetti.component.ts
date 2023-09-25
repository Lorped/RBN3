import { Component, OnInit } from '@angular/core';
import { armidaf , OggettiService } from '../../_services/index';
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

  armidafuoco: Array<armidaf> = [];
  armidamischia: Array<armidaf> = [];
  livellocriminalita= 0;
  cash = 0 ;

  constructor (private oggettiservice: OggettiService, private maticonreg: MatIconRegistry, private sanitizer: DomSanitizer, private status: Status) {
    this.maticonreg.addSvgIcon( 'gun' , this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/gun.svg') );
    this.maticonreg.addSvgIcon( 'sword' , this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sword.svg'));
  }

  ngOnInit(): void {
    
    this.oggettiservice.getcriminal().subscribe( (data: criminal)=>{
      this.livellocriminalita = Number(data.livello);
      this.cash = Number(data.cash);
    });
    
    this.oggettiservice.getarmidamischia().subscribe ( (data: Array<armidaf>) => {
      this.armidamischia = data;
    });
    
    this.oggettiservice.getarmidaf().subscribe ( (data: Array<armidaf>) => {
      this.armidafuoco = data;
    });
  }

  acquista(id: number){
    this.oggettiservice.compra(id).subscribe(()=> {
      for (let i=0; i<this.armidafuoco.length ; i++){
        if (this.armidafuoco[i].IDoggetto === id) {
          ++this.armidafuoco[i].Quantita;
          this.cash = this.cash - this.armidafuoco[i].Costo;
          this.status.cash = this.cash;
        }
      }
      for (let i=0; i<this.armidamischia.length ; i++){
        if (this.armidamischia[i].IDoggetto === id) {
          ++this.armidamischia[i].Quantita;
          this.cash = this.cash - this.armidamischia[i].Costo;
          this.status.cash = this.cash;
        }
      }
      
    });
  }
}
