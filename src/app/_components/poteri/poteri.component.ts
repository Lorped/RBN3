import { AfterViewInit, Component, OnInit } from '@angular/core';

import {  ListaPoteri, ListpresentiService, Potere, Presenti, SchedaService } from '../../_services/index';

import { Status } from '../../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


export class variform {
  idform = 0;
  myFormGroupArray: Array<FormGroup> = [];
}



@Component({
  selector: 'app-poteri',
  templateUrl: './poteri.component.html',
  styleUrls: ['./poteri.component.css']
})
export class PoteriComponent implements OnInit , AfterViewInit {

  myvariformarray: Array<variform> = [];

  filteredOptions: Observable<Presenti[]>;
  presenti: Array<Presenti>;

  myPS= 0;
  myPSmax = 0;
  myFdV = 0 ;
  myFdVmax = 0 ;

  myLista: Array<ListaPoteri> = [];

  constructor( private schedaService: SchedaService, public status: Status, private listapresenti: ListpresentiService ) {}





  ngOnInit() {

    this.myPS = this.status.PS;
    this.myPSmax = this.status.PSmax;
    this.myFdV = this.status.FdV;
    this.myFdVmax = this.status.FdVmax;

    this.schedaService.getpoteri()
    .subscribe( (data: Array<ListaPoteri>) => {
      
      
      for (let i=0 ; i<data.length; i++) {
        var unvariform = new variform();
        unvariform.idform = data[i].IDdisciplina;

        for (let j = 0 ; j < data[i].pot.length ; j++ ) {
          data[i].pot[j].Difficolta = Number ( data[i].pot[j].Difficolta );
          data[i].pot[j].UsoSangue = Number ( data[i].pot[j].UsoSangue );
          data[i].pot[j].UsoFdV = Number ( data[i].pot[j].UsoFdV );
          data[i].pot[j].TotaleDP = Number ( data[i].pot[j].TotaleDP );

          if ( data[i].pot[j].Target === 'S') {
            const aFormGroup = new FormGroup({
              targetFC: new FormControl({value: '', disabled: !this.status.Alive}, Validators.required )
            });
            unvariform.myFormGroupArray.push(aFormGroup);
          } else { //Praticamente vuoto
            const aFormGroup = new FormGroup({
              targetFC: new FormControl('')
            });
            unvariform.myFormGroupArray.push(aFormGroup);
          }
        }
        this.myvariformarray.push(unvariform);
      }
      this.myLista = data;

      //console.log(this.myvariformarray);
      //console.log(this.status.Alive);
    });

    this.listapresenti.getpginstanza(this.status.Stanza, this.status.Userid).subscribe( (data: Array<Presenti>) => {
      this.presenti = data;
      //console.log(this.anagrafe);
      for (let i = 0; i < this.presenti.length; i++) {
        this.presenti[i].Userid = Number(this.presenti[i].Userid);
      }

      const PNG = new Presenti("PNG", 'M', 0, 0, 'S', "", "");

      this.presenti.push(PNG);
      console.log (this.presenti);

      for (let i = 0 ; i < this.myvariformarray.length ; i ++) {
        for (let j = 0 ; j < this.myvariformarray[i].myFormGroupArray.length ; j ++) {
          this.filteredOptions = this.myvariformarray[i].myFormGroupArray[j].get('targetFC').valueChanges.pipe(
            startWith(''),
            map(value => this.myfilter(value || '' )),
          );
          console.log("filtered opt = ", this.filteredOptions);
        }  
      }
    });

  }


  ngAfterViewInit() {
  }

  gopoteri(pot: Array<Potere>, idx: number, itx: number, s: number){
    if (!this.status.Alive) return;
    const found = pot.find( (xx) => xx.ID == idx);
    if ( found.Target === 'S' &&  ! this.myvariformarray[itx].myFormGroupArray[s].valid ) return;
    
    console.log("here");
    console.log("iddisciplina = ", found.IDdisciplina,  );
    console.log("disciplina = ", found.NomePotere  );

    if  ( found.Target === 'S' ) {
      var target = this.myvariformarray[itx].myFormGroupArray[s].value.targetFC;
      console.log("target =", target.NomeCognome );
      console.log(this.presenti);
      const foundx = this.presenti.find( (xx) => xx.NomeCognome === target.NomeCognome );
      
      console.log(foundx);

      if ( !foundx  ) {
        for (let i = 0 ; i < this.myvariformarray.length; i++){
          for (let j=0; j <this.myvariformarray[i].myFormGroupArray.length ; j++) {
            this.myvariformarray[i].myFormGroupArray[j].reset();
          }
        }
        console.log("non trovato => reset");
        return;
      }

    }
  }


  myfilter(obj: string): Presenti[] {
    if ( typeof obj != "string" ) return null;
    console.log("in myfilter :" , obj);
    const filterValue = obj.toLowerCase();
    return this.presenti.filter(option => option.NomeCognome.toLowerCase().includes(filterValue));
  }
  displayFn  (user: Presenti) :string {
    return user && user ? user.NomeCognome : '';
  }

  doStuff(event:any) {

    console.log("event: ", event);
    /*
    this.trigger.panelClosingActions.subscribe((e) => {
      if (!(e && e.source)) {
        console.log("e =",e);
        // clear value if is not from the filtered list
        for (let i = 0 ; i < this.myvariformarray.length; i++){
          for (let j=0; j <this.myvariformarray[i].myFormGroupArray.length ; j++) {
            this.myvariformarray[i].myFormGroupArray[j].setValue({targetFC: ''});
            this.trigger.closePanel();
          }
        }
        
      }
    });
    */

  }

}
