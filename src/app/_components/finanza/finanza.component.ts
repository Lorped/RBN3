
import { Component, OnInit } from '@angular/core';
import { AnagrafeRow, AnagrafeService, SchedaService, finanza } from '../../_services/index';
import { Observable } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../globals';
import { map, startWith } from 'rxjs/operators';




@Component({
  selector: 'app-finanza',
  templateUrl: './finanza.component.html',
  styleUrls: ['./finanza.component.css']
})
export class FinanzaComponent implements OnInit{

  finanzepg: finanza = new finanza();
  sommamensile = 0;

  filteredOptions: Observable<AnagrafeRow[]>;
  anagrafe: Array<AnagrafeRow> = [];
  myFormGroup: FormGroup;

  constructor ( private schedaservice: SchedaService, private anagrafeservice: AnagrafeService, public status: Status) {}

  ngOnInit(): void {


    this.myFormGroup = new FormGroup({

      destinatarioFC: new FormControl('', [
        Validators.required
      ]),

      importoFC: new FormControl(0, [
        Validators.required,
        Validators.min(1),
        (control: AbstractControl) => Validators.max(this.finanzepg.cash)(control)

      ]),

      causaleFC: new FormControl('', [
        Validators.required
      ]),

    });

    
    this.schedaservice.finanze().subscribe((data)=> {
      this.finanzepg = data;
      this.finanzepg.cash = Number(data.cash);
      this.finanzepg.risorse = Number(data.risorse);
      this.finanzepg.entrate = Number(data.entrate);
      this.status.cash = this.finanzepg.cash;

      this.sommamensile = Number(this.finanzepg.entrate);
      for ( let i = 0; i < this.finanzepg.mybalance.length ; i++) {
        this.finanzepg.mybalance[i].mensile = Number(this.finanzepg.mybalance[i].mensile);
        this.finanzepg.mybalance[i].livello = Number(this.finanzepg.mybalance[i].livello);
        this.sommamensile = this.sommamensile + this.finanzepg.mybalance[i].mensile;
      }
    });
  

  this.anagrafeservice.anagrafe()
    .subscribe( (data: Array<AnagrafeRow>) => {
      this.anagrafe = data;
      //console.log(this.anagrafe);
      
      for (let i = 0; i < this.anagrafe.length; i++) {
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

  myfilter(obj: string): AnagrafeRow[] {
    if ( typeof obj != "string" ) return null;
    // console.log("in myfilter :" , obj);
    const filterValue = obj.toLowerCase();
    return this.anagrafe.filter(option => option.Nome.toLowerCase().includes(filterValue));
  }
  displayFn  (user: AnagrafeRow) :string {
    return user && user ? user.Nome : '';
  }


  invia(){
    /*
    console.log(this.myFormGroup.value.destinatarioFC.Userid) ;
    console.log(this.myFormGroup.value.importoFC) ;
    console.log(this.myFormGroup.value.causaleFC) ; */

    this.schedaservice.sendmoney(this.myFormGroup.value.destinatarioFC.Userid, this.myFormGroup.value.importoFC, this.myFormGroup.value.causaleFC )
    .subscribe( () =>{
      this.finanzepg.cash = this.finanzepg.cash - this.myFormGroup.value.importoFC;
      this.myFormGroup.reset();
    });
  }


}
