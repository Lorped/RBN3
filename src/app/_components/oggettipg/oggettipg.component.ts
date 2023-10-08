import { Component, OnInit } from '@angular/core';
import { OggettiService, posseduti, disposizione, AnagrafeRow, AnagrafeService } from '../../_services/index';
import { Status } from '../../globals';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


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


  quantitamax = 1;

  myFormGroup: FormGroup;
  filteredOptions: Observable<AnagrafeRow[]>;
  anagrafe: Array<AnagrafeRow> = [];
  filteredOptions2: Observable<posseduti[]>;

 
  swaplock = false;

  constructor(private oggettiservice: OggettiService, public status: Status, private anagrafeservice: AnagrafeService) {  }

  ngOnInit() {
    interface Checkchat {
      c: number;
    }

    this.oggettiservice.checkckat().subscribe( (data: Checkchat) => {
      if ( Number(data.c) !== 0 ) {
        console.log(data);
        this.swaplock = true;
      }

    });


    this.myFormGroup = new FormGroup({
      destinatarioFC: new FormControl('', [
        Validators.required
      ]),
      oggettoFC: new FormControl('', [
        Validators.required
      ]),
      quantitaFC: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        (control: AbstractControl) => Validators.max(this.quantitamax)(control)
      ]),
    });

    //console.log (this.myFormGroup);

    this.oggettiservice.getoggetti(this.status.Userid).subscribe( (data: Array<posseduti>)=> {
      //console.log(data);
      this.oggettiposseduti = data;

      //console.log(this.oggettiposseduti);

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

      this.filteredOptions2 = this.myFormGroup.get('oggettoFC').valueChanges.pipe(
        startWith(''),
        map(value => this.myfilter2(value || '' )),
      );   

    });


    this.anagrafeservice.anagrafe()
    .subscribe( (data: Array<AnagrafeRow>) => {
      this.anagrafe = data;
      //console.log(this.anagrafe);
      
      for (let i = 0; i < this.anagrafe.length; i++) {
        this.anagrafe[i].Userid = Number(this.anagrafe[i].Userid);
        if (this.anagrafe[i].Userid === this.status.Userid) {
          this.anagrafe.splice(i--, 1);
        }
      }

      // forzo nome = nome + cognome
      for (let i = 0; i < this.anagrafe.length; i++) {
        this.anagrafe[i].Nome = this.anagrafe[i].Nome + ' ' + this.anagrafe[i].Cognome;
      }

      this.filteredOptions = this.myFormGroup.get('destinatarioFC').valueChanges.pipe(
        startWith(''),
        map(value => this.myfilter(value || '' )),
      );      
    });


    
  }


  swapout(id: number, IDoggetto: number) {
    // 1 - T1
    // 2 - T2
    // 3 - G
    // 4 - I
    // 5 - N
    if (this.swaplock) return;

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
    this.oggettiservice.swapinout( 'out', IDoggetto).subscribe();
  }

  swapin(id) {

    if (this.swaplock) return;
    
    const found = this.oggettiposseduti.find( (xx) => xx.IDoggetto === id);
    

    switch (found.Occultabile) {
      case 'T':

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
   this.oggettiservice.swapinout( 'in', found.IDoggetto).subscribe();
 }
  

 myfilter(obj: string): AnagrafeRow[] {
  if ( typeof obj != "string" ) return null;
  // console.log("in myfilter :" , obj);
  const filterValue = obj.toLowerCase();
  return this.anagrafe.filter(option => option.Nome.toLowerCase().includes(filterValue));
  }
  displayFn  (user: AnagrafeRow) :string {
    return user && user ? user.Nome : '';
  }

  myfilter2(obj: string): posseduti[] {
    if ( typeof obj != "string" ) return null;
    // console.log("in myfilter :" , obj);
    const filterValue = obj.toLowerCase();
    return this.oggettiposseduti.filter(option => option.Nome.toLowerCase().includes(filterValue));
  }
  displayFn2  (user: posseduti) :string {

    return user && user ? user.Nome : '';
  }

  trasferisci(){

    this.oggettiservice.cedi( this.myFormGroup.value.destinatarioFC.Userid, this.myFormGroup.value.oggettoFC.IDoggetto, this.myFormGroup.value.quantitaFC)
    .subscribe( () => {

      const idx = this.oggettiposseduti.findIndex( (xx) => xx.IDoggetto === this.myFormGroup.value.oggettoFC.IDoggetto);

      this.oggettiposseduti[idx].Quantita = this.oggettiposseduti[idx].Quantita - this.myFormGroup.value.quantitaFC;

      if (this.oggettiposseduti[idx].Quantita == 0 ) {
        let i = idx;
        this.oggettiposseduti.splice(i--, 1);
      }

      

      if ( this.myFormGroup.value.oggettoFC.IDoggetto == this.miadisp.tasca1  ){
        this.miadisp.tasca1 = 0;
        this.miadisp.tasca1_img = "slot/belt.png";
      } else if ( this.myFormGroup.value.oggettoFC.IDoggetto == this.miadisp.tasca2 ) {
        this.miadisp.tasca2 = 0;
        this.miadisp.tasca2_img = "slot/purse.png";
      } else if (this.myFormGroup.value.oggettoFC.IDoggetto == this.miadisp.giacca ) {
        this.miadisp.giacca = 0;
        this.miadisp.giacca_img = "slot/jacket.png";
      } else if (this.myFormGroup.value.oggettoFC.IDoggetto == this.miadisp.impermeabile ) {
        this.miadisp.impermeabile = 0;
        this.miadisp.impermeabile_img = "slot/trench.png";
      } else if (this.myFormGroup.value.oggettoFC.IDoggetto == this.miadisp.nessuno ) {
        this.miadisp.nessuno = 0;
        this.miadisp.nessuno_img = "slot/out.png";
      }

      this.myFormGroup.reset();

    });
  }

  updqty() {
    this.quantitamax = this.myFormGroup.value.oggettoFC.Quantita;
  }
  
}
