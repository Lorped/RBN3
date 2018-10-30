import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Attributo, Clan, Archetipo } from '../../../globals';
import { SignupService } from '../../../_services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registra1',
  templateUrl: './registra1.component.html',
  styleUrls: ['./registra1.component.css']
})
export class Registra1Component implements OnInit {

  registrationForm: FormGroup;

  archetipi: Array<Archetipo> = [];
  clan: Array<Clan> = [];
  attributi: Array<Attributo> = [];

  num4 = 0;
  num3 = 0;
  num2 = 0;
  num1 = 0;

  max1 = 1;
  max2 = 4;
  max3 = 3;
  max4 = 1;

  formOK = false ;

  M = 'M';
  F = 'F';

  salute = 3;
  fdv = 0;

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

      etaPG: new FormControl('', [
        Validators.required,
        Validators.min(1900),
        Validators.max(2000)
      ]),

      etaAPG: new FormControl('', [
        Validators.required,
        Validators.min(16),
        Validators.max(80)
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
      (res: any) => {
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

      this.num1 = this.max1;
      this.num2 = this.max2;
      this.num3 = this.max3;
      this.num4 = this.max4;

      this.formOK = true;

      this.salute=this.attributi[2].Livello + 3 ;   //costituzione + 3
      this.fdv=this.attributi[5].Livello + this.attributi[8].Livello ;   //determ. + compost.
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
    if (this.attributi[attr - 1].Livello === 1 ) { this.num1++; }
    if (this.attributi[attr - 1].Livello === 2 ) { this.num2++; this.num1--; }
    if (this.attributi[attr - 1].Livello === 3 ) { this.num3++; this.num2--; }
    if (this.attributi[attr - 1].Livello === 4 ) { this.num4++; this.num3--; }

    this.formOK = false;
    if (
      (this.num1 === this.max1)  &&
      (this.num2 === this.max2)  &&
      (this.num3 === this.max3)  &&
      (this.num4 === this.max4)
    ) {
      this.formOK = true;
    }
    this.salute=this.attributi[2].Livello + 3 ;   //costituzione + 3
    this.fdv=this.attributi[5].Livello + this.attributi[8].Livello ;   //determ. + compost.
  }
  minattr (attr: number) {
    this.attributi[attr - 1].Livello--;
    if (this.attributi[attr - 1].Livello === 0 ) {              this.num1--; }
    if (this.attributi[attr - 1].Livello === 1 ) { this.num1++; this.num2--; }
    if (this.attributi[attr - 1].Livello === 2 ) { this.num2++; this.num3--; }
    if (this.attributi[attr - 1].Livello === 3 ) { this.num3++; this.num4--; }
    //if (this.attributi[attr - 1].Livello === 4 ) { this.num4++; }
    this.formOK = false;
    if (
      (this.num1 === this.max1)  &&
      (this.num2 === this.max2)  &&
      (this.num3 === this.max3)  &&
      (this.num4 === this.max4)
    ) {
      this.formOK = true;
    }
    this.salute=this.attributi[2].Livello + 3 ;   //costituzione + 3
    this.fdv=this.attributi[5].Livello + this.attributi[8].Livello ;   //determ. + compost.
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
    for (let j = 0; j < this.archetipi.length; j++ ) {
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

}
