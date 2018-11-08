import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../../_services/signup.service';
import { Disciplina, Background } from '../../../globals';
import { Router } from '@angular/router';
import { FormControl  } from '@angular/forms';

@Component({
  selector: 'app-registra3',
  templateUrl: './registra3.component.html',
  styleUrls: ['./registra3.component.css']
})
export class Registra3Component implements OnInit {

  bg: Array<Background> = [];
  discipline: Array<Disciplina> = [];



  necro = [];
  taum = [];
  necroPG = { IDnecro: 0 , NomeNecro: '', Acquisibile: 0 , Livello: 0 };
  taumPG = { IDtaum: 0 , NomeTaum: '', Acquisibile: 0 , Livello: 0 };


  sommadisc = 0;
  discOK = false;

  sommabg = 0;
  bgOK = false;

  sent = [ {IDsentiero: '1' , DescSentiero: 'Umanità' } ];
  sentieroPG =  {IDsentiero: '1' , DescSentiero: 'Umanità' } ;

  z = 0;

  fdv = 0;

  constructor( private signupservice: SignupService, private router: Router ) { }

  ngOnInit() {
    let prevdatastring = sessionStorage.getItem('RBN3registration1') ;
    let prevdata = JSON.parse(prevdatastring);

    this.fdv = prevdata.attributi[5].Livello + prevdata.attributi[8].Livello;
    // console.log(prevdata);

    this.signupservice.getregistra3(prevdata.clanPG)
    .subscribe(
      (res: any) => {
        this.bg = res.bg;
        for (let j = 0; j < this.bg.length; j++ ) {
          this.bg[j].LivelloBG = Number(this.bg[j].LivelloBG);
        }
        this.discipline = res.disc;
        this.necro = res.necro;
        this.taum = res.taum;

        if (this.necro.length > 0 ) {
          this.z = 1 ;
        } else if (this.taum.length > 0) {
          this.z = 2;
        }
        this.sent = res.sent;

        if ( prevdatastring = sessionStorage.getItem('RBN3registration3') ) {
          prevdata = JSON.parse(prevdatastring);

          this.bg = prevdata.bg;
          this.sentieroPG = this.sent[prevdata.sentieroPG.IDsentiero - 1];

          if ( this.necro.length > 0) {
            this.necroPG = this.necro[prevdata.necroPG.IDnecro - 1];
          }
          if (this.taum.length > 0) {
            this.taumPG = this.taum[prevdata.taumPG.IDtaum - 1];
          }

          for (let k = 0; k < prevdata.discipline.length; k++) {
            this.discipline[k].LivelloDisc = prevdata.discipline[k].LivelloDisc;
          }
          this.sommadisc = 3;
          this.discOK = true;
          this.sommabg = 5;
          this.bgOK = true ;
        }
    });


  }

  addattr (disc: number) {
    this.discOK = false ;
    for (let j = 0; j < this.discipline.length; j++ ) {
      if ( this.discipline[j].IDdisciplina === disc) {
        this.discipline[j].LivelloDisc++;
        this.sommadisc++;
      }
    }
    if (this.sommadisc === 3 ) {
      this.discOK = true ;
    }
  }

  minattr (disc: number) {
    this.discOK = false ;
    for (let j = 0; j < this.discipline.length; j++ ) {
      if ( this.discipline[j].IDdisciplina === disc) {
        this.discipline[j].LivelloDisc--;
        this.sommadisc--;
      }
    }
    if (this.sommadisc === 3 ) {
      this.discOK = true ;
    }
  }

/* *** *********
  mincoscienza () {
    this.coscienza--;
    this.sommavirtu--;
    this.virtuOK = false ;
    if (this.sommavirtu === 8) {
      this.virtuOK = true ;
    }
    if (this.selfcontrol + this.coscienza  < 6) {
      this.sentieroPG = this.sent[0];
    }
  }
  addcoscienza () {
    this.coscienza++;
    this.sommavirtu++;
    this.virtuOK = false ;
    if (this.sommavirtu === 8) {
      this.virtuOK = true ;
    }
  }
  mincoraggio () {
    this.coraggio--;
    this.sommavirtu--;
    this.virtuOK = false ;
    if (this.sommavirtu === 8) {
      this.virtuOK = true ;
    }
  }
  addcoraggio () {
    this.coraggio++;
    this.sommavirtu++;
    this.virtuOK = false ;
    if (this.sommavirtu === 8) {
      this.virtuOK = true ;
    }
  }
  minselfcontrol () {
    this.selfcontrol--;
    this.sommavirtu--;
    this.virtuOK = false ;
    if (this.sommavirtu === 8) {
      this.virtuOK = true ;
    }
    if (this.selfcontrol + this.coscienza  < 6) {
      this.sentieroPG = this.sent[0];
    }
  }
  addselfcontrol () {
    this.selfcontrol++;
    this.sommavirtu++;
    this.virtuOK = false ;
    if (this.sommavirtu === 8) {
      this.virtuOK = true ;
    }
  }

  ****** */

  addbg (bg: number) {
    this.bgOK = false ;
    for (let j = 0; j < this.bg.length; j++ ) {
      if ( this.bg[j].IDbackground === bg) {
        this.bg[j].LivelloBG++;
        this.sommabg++;
      }
    }
    if (this.sommabg === 5 ) {
      this.bgOK = true ;
    }
  }

  minbg (bg: number) {
    this.bgOK = false ;
    for (let j = 0; j < this.bg.length; j++ ) {
      if ( this.bg[j].IDbackground === bg) {
        this.bg[j].LivelloBG--;
        this.sommabg--;
      }
    }
    if (this.sommabg === 5 ) {
      this.bgOK = true ;
    }
  }


  goback() {
    this.router.navigate(['/registra/2']);
  }

  goto4() {

    const myobj = {
      'sentieroPG': this.sentieroPG,
      'bg': this.bg,
      'discipline': this.discipline,
      'necroPG': this.necroPG,
      'taumPG': this.taumPG
    };
    sessionStorage.setItem('RBN3registration3', JSON.stringify(myobj) );
    this.router.navigate(['/registra/4']);
  }

}
