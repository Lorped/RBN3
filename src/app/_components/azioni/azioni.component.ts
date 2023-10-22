import { Component, OnInit } from '@angular/core';
import { SchedaService, SignupService, esitocura, getreg1, getreg2, modificasalute } from '../../_services/index';
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

  ModSalute = 0;
  DescSalute = '';

  IDsalute = 7;
  daurto = 0 ;
  aggravati = 0;
  letali = 0;
  UsoPS = 0 ;
  poolaggravati = 0;

  usofdv=false;
  usabili = 1;


  constructor ( private signup: SignupService, public status: Status, public schedaservice: SchedaService) {}

  ngOnInit() {

    this.signup.getregistra1().subscribe((data: getreg1)=>{
      this.listaattributi = data.attributi;
      //console.log(this.listaattributi);
    });
    this.signup.getregistra2().subscribe((data: getreg2)=>{
      this.listaskill = data.skill;
      //console.log(this.listaskill);
    });

    this.schedaservice.checksalute().subscribe((data: modificasalute)=>{
      this.ModSalute = data.ModSalute;
      this.DescSalute = data.DescSalute;
      this.IDsalute = Number(data.IDsalute);
      this.daurto = Number(data.daurto);
      this.aggravati = Number(data.aggravati);
      this.letali = 7 - this.IDsalute - this.daurto -  this.aggravati;
      this.UsoPS = Number(data.UsoPS);
      console.log(data);
      console.log(this.aggravati);

      this.usabili = Math.min(this.status.PS -1 , this.UsoPS);

      if ( this.UsoPS > this.status.PS - 1) {
        this.UsoPS = this.status.PS -1 ;
      }
    });
    
  }


  docheck() {
    const idattr=Number(this.checkFG.value.attrFC);
    const idskill=Number(this.checkFG.value.skillFC);
    const diff=this.checkFG.value.diffFC;
    this.schedaservice.checkattr(idattr, idskill, diff, this.status.Stanza).subscribe( ()=> {
      this.schedaservice.updateazionato( Date() ) ;  //giusto per mettere un valore nuovo
    })

    //console.log(this.checkFG.value.attrFC, this.checkFG.value.skillFC, this.checkFG.value.diffFC);
    
    this.checkFG.reset();
    this.checkFG.patchValue({diffFC: 6});
  }


  changefdv(){
    console.log("changefdv");
  }

  gocura() {
    console.log ("gocura");
    this.schedaservice.cura(this.status.Stanza).subscribe( (data:esitocura)=>{
      console.log(data);
      this.status.PS=this.status.PS - Number(data.usati);
      this.DescSalute = data.DescSalute;
      this.daurto = Number (data.daurto);
      this.aggravati = Number (data.aggravati);
      this.IDsalute = Number(data.IDsalute);
      this.ModSalute = Number(data.ModSalute);
      this.letali = 7 - this.IDsalute - this.daurto - this.aggravati;
      this.poolaggravati = data.poolaggravati;
      console.log(this.poolaggravati);
      if (this.poolaggravati === 0 ) {
        sessionStorage.removeItem('RBN3poolaggravati');
      } else {
        sessionStorage.setItem('RBN3poolaggravati', this.poolaggravati.toString() );
      }

    });
  }

}
