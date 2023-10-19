import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormGroupDirective,AbstractControl } from '@angular/forms';
import { Attributo, Clan, Archetipo } from '../../../globals';
import { SignupService, getreg1 } from '../../../_services/signup.service';
import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';

import { Observable, of } from 'rxjs';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-registra1',
  templateUrl: './registra1.component.html',
  styleUrls: ['./registra1.component.css']
})


export class Registra1Component implements OnInit {

  matcher = new MyErrorStateMatcher();

  registrationForm: FormGroup;

  archetipi: Array<Archetipo> = [];
  clan: Array<Clan> = [];
  attributi: Array<Attributo> = [];

  sommaF = 3;
  sommaS = 3;
  sommaM = 3;

  formOK = false ;

  M = 'M';
  F = 'F';

  //salute = 3;
  //fdv = 0;

  today: number = (new Date()).getFullYear();




  constructor( private signupservice: SignupService, private router: Router) { }

  ngOnInit() {

    let olddata: any;
    let olddatastring: string;


    this.registrationForm = new FormGroup ({
      nomePG: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-zàèìòù]+$')
      ]),

      cognomePG: new FormControl('', [
        Validators.pattern('^[A-Za-zàèìòù \']+$')
      ]),

      etaPG: new FormControl(1980, [
        Validators.required,
        Validators.min(1890),
        Validators.max(this.today - 18)
      ], [
        this.validateEta.bind(this)
      ]),

      etaAPG: new FormControl(20, [
        Validators.required,
        Validators.min(18),
        Validators.max(60)
      ], [
        this.validateEta.bind(this)
      ]),

      naturaPG: new FormControl('', [
        Validators.required,
      ]),

      clanPG: new FormControl('', [
        Validators.required,
      ]),

      caratterePG: new FormControl('', [
        Validators.required,
      ]),

      Sesso: new FormControl('', [
        Validators.required
      ])

    });

    if ( olddatastring = sessionStorage.getItem('RBN3registration1') ) {
      olddata = JSON.parse(olddatastring);
    }


    this.signupservice.getregistra1()
    .subscribe(
      (res: getreg1) => {
        this.archetipi = res.archetipi;
        this.clan = res.clan;

        if ( !olddata ) {
          this.attributi = res.attributi;
          for (let j = 0; j < this.attributi.length; j++ ) {
            this.attributi[j].Livello = Number(this.attributi[j].Livello);
          }
        } else {
          this.attributi = olddata.attributi;
        }

    });


    if ( olddata ) {

      this.attributi = olddata.attributi;
      this.registrationForm.patchValue({
        nomePG: olddata.nomePG,
        cognomePG: olddata.cognomePG,
        etaPG: olddata.etaPG,
        etaAPG: olddata.etaAPG,
        clanPG: olddata.clanPG,
        naturaPG: olddata.naturaPG,
        caratterePG: olddata.caratterePG,
        Sesso: olddata.Sesso
      });

      this.sommaF = this.attributi[0].Livello + this.attributi[1].Livello + this.attributi[2].Livello;
      this.sommaS = this.attributi[3].Livello + this.attributi[4].Livello + this.attributi[5].Livello;
      this.sommaM = this.attributi[6].Livello + this.attributi[7].Livello + this.attributi[8].Livello;
      this.formOK = true;



    }
  }

  get nomePG() {
      return this.registrationForm.get('nomePG');
  }
  get cognomePG() {
      return this.registrationForm.get('cognomePG');
  }
  get etaPG() {
      return this.registrationForm.get('etaPG');
  }
  get etaAPG() {
      return this.registrationForm.get('etaAPG');
  }
  get naturaPG() {
      return this.registrationForm.get('naturaPG');
  }
  get caratterePG() {
      return this.registrationForm.get('caratterePG');
  }
  get clanPG() {
      return this.registrationForm.get('clanPG');
  }
  get Sesso() {
      return this.registrationForm.get('Sesso');
  }






  addattr (attr: number) {
    this.attributi[attr - 1].Livello++;
    this.sommaF = this.attributi[0].Livello + this.attributi[1].Livello + this.attributi[2].Livello;
    this.sommaS = this.attributi[3].Livello + this.attributi[4].Livello + this.attributi[5].Livello;
    this.sommaM = this.attributi[6].Livello + this.attributi[7].Livello + this.attributi[8].Livello;

    this.formOK = false;
    if (
      (this.sommaF === 10 && this.sommaS === 8 && this.sommaM === 6) ||
      (this.sommaF === 10 && this.sommaS === 6 && this.sommaM === 8) ||
      (this.sommaF === 8 && this.sommaS === 10 && this.sommaM === 6) ||
      (this.sommaF === 8 && this.sommaS === 6 && this.sommaM === 10) ||
      (this.sommaF === 6 && this.sommaS === 8 && this.sommaM === 10) ||
      (this.sommaF === 6 && this.sommaS === 10 && this.sommaM === 8)
    ) {
      this.formOK = true;
    }

  }
  minattr (attr: number) {
    this.attributi[attr - 1].Livello--;
    this.sommaF = this.attributi[0].Livello + this.attributi[1].Livello + this.attributi[2].Livello;
    this.sommaS = this.attributi[3].Livello + this.attributi[4].Livello + this.attributi[5].Livello;
    this.sommaM = this.attributi[6].Livello + this.attributi[7].Livello + this.attributi[8].Livello;
    this.formOK = false;
    if (
      (this.sommaF === 10 && this.sommaS === 8 && this.sommaM === 6) ||
      (this.sommaF === 10 && this.sommaS === 6 && this.sommaM === 8) ||
      (this.sommaF === 8 && this.sommaS === 10 && this.sommaM === 6) ||
      (this.sommaF === 8 && this.sommaS === 6 && this.sommaM === 10) ||
      (this.sommaF === 6 && this.sommaS === 8 && this.sommaM === 10) ||
      (this.sommaF === 6 && this.sommaS === 10 && this.sommaM === 8)
    ) {
      this.formOK = true;
    }
  }

  goto2() {
    let clanname = '';
    for (let j = 0; j < this.clan.length; j++ ) {
      if (this.clan[j].IDclan === this.clanPG.value ) {
        clanname = this.clan[j].NomeClan ;
      }
    }
    let naturaname = '';
    let caratterename = '';
    for (let j = 0; j<this.archetipi.length; j++ ){
      if (this.archetipi[j].IDarchetipo === this.naturaPG.value ) {
        naturaname = this.archetipi[j].Archetipo ;
      } else if (this.archetipi[j].IDarchetipo === this.caratterePG.value ) {
        caratterename = this.archetipi[j].Archetipo ;
      }
    }
    const myobj = {
      'nomePG': this.nomePG.value,
      'cognomePG': this.cognomePG.value,
      'clanPG': this.clanPG.value,
      'Sesso': this.Sesso.value,
      'clanname': clanname,
      'naturaPG': this.naturaPG.value,
      'naturaname': naturaname,
      'caratterePG': this.caratterePG.value,
      'caratterename': caratterename,
      'etaPG': this.etaPG.value,
      'etaAPG': this.etaAPG.value,
      'attributi': this.attributi
    };
    sessionStorage.setItem('RBN3registration1', JSON.stringify(myobj) );
    this.router.navigate(['/registra/2']);
  }


  validateEta (control: AbstractControl) : Observable<any> {
    
    
    
    const esito = (this.registrationForm == undefined) || (this.today - this.etaPG.value >this.etaAPG.value) ? null : { erroreeta: true };
     
    //const esito = null;
    //console.log("here");
    return of(esito);
  }
}
