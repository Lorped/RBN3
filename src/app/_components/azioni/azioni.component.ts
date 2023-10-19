import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../_services/index';
import { Attributo,  Skill, Status } from '../../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-azioni',
  templateUrl: './azioni.component.html',
  styleUrls: ['./azioni.component.css']
})
export class AzioniComponent implements OnInit{

  listaattributi: Array<Attributo>=[];
  listaskill: Array<Skill>=[];
  listadifficolta = [ 3, 4, 5, 6, 7, 8, 9, 10 ];

  checkFG: FormGroup = new FormGroup({
    attrFC:  new FormControl('', [
      Validators.required]),
    skillFC: new FormControl(''),
    diffFC: new FormControl(6)
  });


  constructor ( private signup: SignupService, public status: Status) {}

  ngOnInit() {




    this.signup.getregistra1().subscribe((data: getreg1)=>{
      this.listaattributi = data.attributi;
      console.log(this.listaattributi);
    });
    this.signup.getregistra2().subscribe((data: getreg2)=>{
      this.listaskill = data.skill;
      console.log(this.listaskill);
    });
    
  }


  docheck() {
    console.log(this.checkFG.value.attrFC, this.checkFG.value.skillFC, this.checkFG.value.diffFC);
    this.checkFG.reset();
  }

}
