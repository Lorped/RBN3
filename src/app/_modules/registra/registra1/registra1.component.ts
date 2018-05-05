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

  sommaF = 3;
  sommaS = 3;
  sommaM = 3;
  formOK = false ;



  constructor( private signupservice: SignupService, private router: Router) { }

  ngOnInit() {

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

    });

    this.signupservice.getregistra1()
    .subscribe(
      (res: any) => {
        this.archetipi = res.archetipi;
        this.clan = res.clan;
        this.attributi = res.attributi;

        for (let j = 0; j < this.attributi.length; j++ ) {
          this.attributi[j].Livello = Number(this.attributi[j].Livello);
        }
    });
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
    const myobj = {
      'nomePG': this.nomePG.value,
      'cognomePG': this.cognomePG.value,
      'clanPG': this.clanPG.value,
      'naturaPG': this.naturaPG.value,
      'caratterePG': this.caratterePG.value,
      'etaPG': this.etaPG.value,
      'etaAPG': this.etaAPG.value,
      'attributi': this.attributi
    };
    sessionStorage.setItem('RBN3registration1', JSON.stringify(myobj) );
    this.router.navigate(['/registra/2']);
  }

}