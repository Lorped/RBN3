import {  Component, OnInit } from '@angular/core';

import {  ListaPoteri, ListpresentiService, Potere, Presenti, SchedaService } from '../../_services/index';

import { Status } from '../../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';



export class variform {
  idform = 0;
  myFormGroupArray: Array<FormGroup> = [];
}



@Component({
  selector: 'app-poteri',
  templateUrl: './poteri.component.html',
  styleUrls: ['./poteri.component.css']
})
export class PoteriComponent implements OnInit  {

  myvariformarray: Array<variform> = [];

  presenti: Array<Presenti>;

  myLista: Array<ListaPoteri> = [];


  usofdv = false;
  plusfdv = 0;

  constructor( private schedaService: SchedaService, public status: Status, private listapresenti: ListpresentiService ) {}





  ngOnInit() {


    this.schedaService.getpoteri()
    .subscribe( (data: Array<ListaPoteri>) => {
      
      
      for (let i=0 ; i<data.length; i++) {
        const unvariform = new variform();
        data[i].IDdisciplina = Number ( data[i].IDdisciplina );
        unvariform.idform = data[i].IDdisciplina;

        for (let j = 0 ; j < data[i].pot.length ; j++ ) {
          data[i].pot[j].Difficolta = Number ( data[i].pot[j].Difficolta );
          data[i].pot[j].UsoSangue = Number ( data[i].pot[j].UsoSangue );
          data[i].pot[j].UsoFdV = Number ( data[i].pot[j].UsoFdV );
          data[i].pot[j].TotaleDP = Number ( data[i].pot[j].TotaleDP );
          data[i].pot[j].IDdisciplina = Number ( data[i].pot[j].IDdisciplina );
          data[i].pot[j].LivelloPotere = Number ( data[i].pot[j].LivelloPotere );

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

      const PNG = new Presenti();
      PNG.NomeCognome = "PNG";

      this.presenti.push(PNG);
      //console.log (this.presenti);

    });

  }




  gopoteri(pot: Array<Potere>, idx: number, itx: number, s: number){
    if (!this.status.Alive) return;
    const found = pot.find( (xx) => xx.ID == idx);
    if ( found.Target === 'S' &&  ! this.myvariformarray[itx].myFormGroupArray[s].valid ) return;
    if ( found.Passive === 'S' ) return;

    if ( (found.UsoFdV+this.plusfdv) >= this.status.FdV  ) {
      return;
    } else {
      if ( found.Auto !== 'S' ) {   // NO USO FDV EXTRA PER DISCIPLIEN AUTO 
        this.status.FdV = this.status.FdV - found.UsoFdV - this.plusfdv;
      }

    }

    if ( found.UsoSangue >= this.status.PS  ) {
      return;
    } else {
      this.status.PS = this.status.PS - found.UsoSangue;
    }


    console.log("here");
    console.log ("potere =" , idx );
    console.log("iddisciplina = ", found.IDdisciplina,  );
    console.log("disciplina = ", found.NomePotere  );
    console.log("taum = ", found.NomeTaum  );
    console.log("idtaum = ", found.IDtaum  );
    console.log("necro = ", found.NomeNecro  );
    console.log("idnecro = ", found.IDnecro  );

    let tt = -1;
    let ttn = '';

    if  ( found.Target === 'S' ) {
      const target = this.myvariformarray[itx].myFormGroupArray[s].value.targetFC;
      console.log("target =", target.NomeCognome );
      console.log("targetID =", target.Userid );
      tt = target.Userid;
      ttn = target.NomeCognome;
    } 
       

    this.schedaService.usapotere( idx, found.IDdisciplina, found.IDtaum , found.IDnecro,  tt, ttn, this.usofdv, this.status.Stanza).subscribe(()=>{
      //console.log(data);
      this.schedaService.updateazionato( Date() ) ;  //giusto per mettere un valore nuovo

      for (let i = 0 ; i < this.myvariformarray.length; i++){
        for (let j=0; j <this.myvariformarray[i].myFormGroupArray.length ; j++) {
          this.myvariformarray[i].myFormGroupArray[j].reset();
        }
      }

      this.usofdv = false;
      this.plusfdv = 0;

      if (found.Sessvar !== null ) {
        const now = new Date();
        const item = {
          value: '1',
          expiry: now.getTime() + 21600000 ,   // 1000*60*60 *6 = 21.600.000 millisecondi in 6 ore 
        }
        localStorage.setItem(found.Sessvar, JSON.stringify(item));
      }
      if ( found.IDdisciplina === 16  ) {
        localStorage.setItem("velocita", found.LivelloPotere.toString());
      }

    });
  



  }


  changefdv() {
    this.plusfdv === 0 ? this.plusfdv = 1 : this.plusfdv = 0;
  }



}
