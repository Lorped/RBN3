import { Component, OnInit } from '@angular/core';
import { armidaf , OggettiService } from '../../_services/index';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-oggetti',
  templateUrl: './oggetti.component.html',
  styleUrls: ['./oggetti.component.css']
})
export class OggettiComponent implements OnInit{

  armidafuoco: Array<armidaf> = [];
  livellocriminalita= 0;
  cash = 0 ;

  constructor (private oggettiservice: OggettiService, private maticonreg: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.maticonreg.addSvgIcon( 'gun' , this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/gun.svg') );
    this.maticonreg.addSvgIcon( 'sword' , this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/sword.svg'));
  }

  ngOnInit(): void {
    
    this.oggettiservice.getcriminal().subscribe( (data: any)=>{
      this.livellocriminalita = Number(data.livello);
      this.cash = Number(data.cash);
    });
    

    this.oggettiservice.getarmidaf().subscribe ( (data: Array<armidaf>) => {
      this.armidafuoco = data;
    });
  }
}
