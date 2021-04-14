import { Component, OnInit } from '@angular/core';
import { Skill } from '../../../globals';
import { SignupService } from '../../../_services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registra2',
  templateUrl: './registra2.component.html',
  styleUrls: ['./registra2.component.css']
})
export class Registra2Component implements OnInit {

  skills: Array<Skill> = [];

  sommaA = 0;
  sommaC = 0;
  sommaK = 0;
  formOK = false ;

  constructor( private signupservice: SignupService, private router: Router ) { }

  ngOnInit() {

    let olddata: any;
    let olddatastring: string;

    if ( olddatastring = sessionStorage.getItem('RBN3registration2') ) {
      olddata = JSON.parse(olddatastring);
      this.skills = olddata.skill;

      for ( let j = 0; j < this.skills.length; j++ ) {
        if (this.skills[j].Tipologia === '1' ) {
          this.sommaA = this.sommaA + this.skills[j].Livello;
        } else if (this.skills[j].Tipologia === '2' ) {
          this.sommaC = this.sommaC + this.skills[j].Livello;
        } else if (this.skills[j].Tipologia === '3' ) {
          this.sommaK = this.sommaK + this.skills[j].Livello;
        }
      }
      this.formOK = true ;

    } else {
      this.signupservice.getregistra2()
      .subscribe(
        (res: any) => {
          this.skills = res.skill;
          for (let j = 0; j < this.skills.length; j++ ) {
            this.skills[j].Livello = Number(this.skills[j].Livello);
          }
      });
    }

  }

  addattr (attr: number) {
    this.skills[attr - 1].Livello++;

    for ( let j = 0; j < this.skills.length; j++ ) {
      if (this.skills[j].IDskill === attr ) {
        if (this.skills[j].Tipologia === '1' ) {
          this.sommaA++;
        } else if (this.skills[j].Tipologia === '2' ) {
          this.sommaC++;
        } else if (this.skills[j].Tipologia === '3' ) {
          this.sommaK++;
        }
      }
    }


    this.formOK = false;
    if (
      (this.sommaA === 13 && this.sommaC === 9 && this.sommaK === 5) ||
      (this.sommaA === 13 && this.sommaC === 5 && this.sommaK === 9) ||
      (this.sommaA === 9 && this.sommaC === 13 && this.sommaK === 5) ||
      (this.sommaA === 9 && this.sommaC === 5 && this.sommaK === 13) ||
      (this.sommaA === 5 && this.sommaC === 9 && this.sommaK === 13) ||
      (this.sommaA === 5 && this.sommaC === 13 && this.sommaK === 9)
    ) {
      this.formOK = true;
    }
  }

  minattr (attr: number) {
    this.skills[attr - 1].Livello--;

    for ( let j = 0; j < this.skills.length; j++ ) {
      if (this.skills[j].IDskill === attr ) {
        if (this.skills[j].Tipologia === '1' ) {
          this.sommaA--;
        } else if (this.skills[j].Tipologia === '2' ) {
          this.sommaC--;
        } else if (this.skills[j].Tipologia === '3' ) {
          this.sommaK--;
        }
      }
    }

    this.formOK = false;
    if (
      (this.sommaA === 13 && this.sommaC === 9 && this.sommaK === 5) ||
      (this.sommaA === 13 && this.sommaC === 5 && this.sommaK === 9) ||
      (this.sommaA === 9 && this.sommaC === 13 && this.sommaK === 5) ||
      (this.sommaA === 9 && this.sommaC === 5 && this.sommaK === 13) ||
      (this.sommaA === 5 && this.sommaC === 9 && this.sommaK === 13) ||
      (this.sommaA === 5 && this.sommaC === 13 && this.sommaK === 9)
    ) {
      this.formOK = true;
    }
  }

  goto3() {
    const myobj = {
      'skill': this.skills
    };
    sessionStorage.setItem('RBN3registration2', JSON.stringify(myobj) );
    this.router.navigate(['/registra/3']);
  }
  goback() {
    this.router.navigate(['/registra/1']);
  }

}
