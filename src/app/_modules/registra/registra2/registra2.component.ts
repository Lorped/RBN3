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

  num4 = 0;
  num3 = 0;
  num2 = 0;
  num1 = 0;

  max1a = 10;
  max2a = 8;
  max3a = 1;
  max4a = 0;

  max1b = 7;
  max2b = 5;
  max3b = 3;
  max4b = 0;

  max1c = 3;
  max2c = 3;
  max3c = 3;
  max4c = 1;

  formOK = false ;

  constructor( private signupservice: SignupService, private router: Router ) { }

  ngOnInit() {

    let olddata: any;
    let olddatastring: string;

    if ( olddatastring = sessionStorage.getItem('RBN3registration2') ) {
      olddata = JSON.parse(olddatastring);
      this.skills = olddata.skill;

      for ( let j = 0; j < this.skills.length; j++ ) {
        if (this.skills[j].Livello === 1 ) {
          this.num1++ ;
        } else if (this.skills[j].Livello === 2 ) {
          this.num2++ ;
        } else if (this.skills[j].Livello === 3 ) {
          this.num3++ ;
        } else if (this.skills[j].Livello === 4 ) {
          this.num4++ ;
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

    if ( this.skills[attr - 1].Livello === 1 )  {              this.num1++; }
    if ( this.skills[attr - 1].Livello === 2 )  { this.num1--; this.num2++; }
    if ( this.skills[attr - 1].Livello === 3 )  { this.num2--; this.num3++; }
    if ( this.skills[attr - 1].Livello === 4 )  { this.num3--; this.num4++; }


    this.formOK = false;
    if (
      (this.max1a === this.num1 && this.max2a === this.num2 && this.max3a === this.num3 && this.max4a === this.num4) ||
      (this.max1b === this.num1 && this.max2b === this.num2 && this.max3b === this.num3 && this.max4b === this.num4) ||
      (this.max1c === this.num1 && this.max2c === this.num2 && this.max3c === this.num3 && this.max4c === this.num4)
    ) {
      this.formOK = true;
    }
  }

  minattr (attr: number) {
    this.skills[attr - 1].Livello--;

    if ( this.skills[attr - 1].Livello === 0 )  { this.num1--;              }
    if ( this.skills[attr - 1].Livello === 1 )  { this.num2--; this.num1++; }
    if ( this.skills[attr - 1].Livello === 2 )  { this.num3--; this.num2++; }
    if ( this.skills[attr - 1].Livello === 3 )  { this.num4--; this.num3++; }



    this.formOK = false;
    if (
      (this.max1a === this.num1 && this.max2a === this.num2 && this.max3a === this.num3 && this.max4a === this.num4) ||
      (this.max1b === this.num1 && this.max2b === this.num2 && this.max3b === this.num3 && this.max4b === this.num4) ||
      (this.max1c === this.num1 && this.max2c === this.num2 && this.max3c === this.num3 && this.max4c === this.num4)
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
