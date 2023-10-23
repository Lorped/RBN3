import { Component, OnInit } from '@angular/core';
import { ListpresentiService, Presenti, SchedaService, SignupService, esitocura, getreg1, getreg2 } from '../../_services/index';
import { Attributo,  Basicpg,  Personaggio,  Skill, Status } from '../../globals';
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

  rissaFG: FormGroup = new FormGroup({
    targetFC:  new FormControl('', [
      Validators.required]),
  });

  

  letali = 0;  //LI CALCOLO PER SEMPLICITA
  usabili = 1;  // PS USABLI SE MINORI DI UsoPS
  poolaggravati = 0;

  usofdv=false;


  presenti: Array<Presenti>;
  myPG: Personaggio = new Personaggio();
  myaPG: Basicpg = new Basicpg();

  destrezza = 0;
  rissa = 0 ;
  mischia = 0 ;
  velocita = 0 ;
  velocitaattiva = 0;

  modsalute = 0;

  sessvar_letali = false;
  sessvar_aggravati = false;

  constructor ( private signup: SignupService, public status: Status, public schedaservice: SchedaService, private listapresenti: ListpresentiService) {}

  ngOnInit() {

    this.signup.getregistra1().subscribe((data: getreg1)=>{
      this.listaattributi = data.attributi;
    });
    this.signup.getregistra2().subscribe((data: getreg2)=>{
      this.listaskill = data.skill;
    });

    this.schedaservice.getpg(this.status.Userid)
    .subscribe( (data: Personaggio) => {
      this.myPG = data;
      this.myaPG = this.myPG.aPG;

      this.myaPG.ModSalute = Number(this.myaPG.ModSalute);
      this.myaPG.IDsalute = Number (this.myaPG.IDsalute);
      this.myaPG.daurto = Number (this.myaPG.daurto);
      this.myaPG.aggravati = Number (this.myaPG.aggravati);
      this.letali = 7 - this.myaPG.IDsalute - this.myaPG.daurto -  this.myaPG.aggravati;
      this.myaPG.UsoPS = Number(this.myaPG.UsoPS);
      this.status.PS = Number(this.myaPG.PS);  // FA FEDE IL DB //

      this.usabili = Math.min(this.status.PS -1 , this.myaPG.UsoPS);

      const found = this.myPG.listaAttributi.find ( (xx) => Number(xx.IDattributo) === 3);
      this.destrezza = Number(found.Livello);

      const found2 = this.myPG.listaSkill.find ( (xx) => Number(xx.IDskill) === 8);
      if ( found2 != null) {
        this.rissa = Number(found2.Livello);
      }

      const found3 = this.myPG.listaSkill.find ( (xx) => Number(xx.IDskill) === 13);
      if ( found3 != null) {
        this.mischia = Number(found3.Livello);
      }

      const found4 = this.myPG.listaDiscipline.find ( (xx) => Number(xx.IDdisciplina) === 16);
      if ( found4 != null) {
        this.velocita = Number(found4.LivelloDisc);
      }

      this.velocitaattiva = Number(localStorage.getItem('velocita') );

      if ( this.velocitaattiva == 0) {
        this.destrezza = this.destrezza + this.velocita; 
      }

      this.modsalute = this.myaPG.ModSalute;

    });

    this.sessvar_letali = this.check_localstorage ( 'letali');
    this.sessvar_aggravati = this.check_localstorage ( 'aggravati');
    

    



    this.poolaggravati=Number( localStorage.getItem('RBN3poolaggravati') ) ;
    console.log(this.poolaggravati);

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


  docheck() {
    const idattr=Number(this.checkFG.value.attrFC);
    const idskill=Number(this.checkFG.value.skillFC);
    const diff=this.checkFG.value.diffFC;
    this.schedaservice.checkattr(idattr, idskill, diff, this.status.Stanza, this.usofdv).subscribe( ()=> {
      this.schedaservice.updateazionato( Date() ) ;  //giusto per mettere un valore nuovo

      if (this.usofdv === true) {
        this.status.FdV = this.status.FdV - 1 ;
      }
    })

    //console.log(this.checkFG.value.attrFC, this.checkFG.value.skillFC, this.checkFG.value.diffFC);
    
    this.checkFG.reset();
    this.checkFG.patchValue({diffFC: 6});
    this.usofdv = false;
  }



  gocura() {
    console.log ("gocura");
    this.schedaservice.cura(this.status.Stanza).subscribe( (data:esitocura)=>{
      console.log(data);
      this.status.PS=this.status.PS - Number(data.usati);
      this.myaPG.DescSalute = data.DescSalute;
      this.myaPG.daurto = Number (data.daurto);
      this.myaPG.aggravati = Number (data.aggravati);
      this.myaPG.IDsalute = Number(data.IDsalute);
      this.myaPG.ModSalute = Number(data.ModSalute);
      this.letali = 7 - this.myaPG.IDsalute - this.myaPG.daurto - this.myaPG.aggravati;
      this.poolaggravati = data.poolaggravati;
      // console.log(this.poolaggravati);
      if (this.poolaggravati === 0 ) {
        localStorage.removeItem('RBN3poolaggravati');
      } else {
        localStorage.setItem('RBN3poolaggravati', this.poolaggravati.toString() );
      }

    });
  }

  changefdv(){
    this.usofdv == false ? this.modsalute = this.myaPG.ModSalute : this.modsalute = 0 ;
  }

  check_localstorage ( key: string) {
    const itemStr = localStorage.getItem ( key );
    if ( itemStr) {
      const oggetto = JSON.parse(itemStr);
      const now = new Date()
      // compare the expiry time of the item with the current time
      if (now.getTime() > oggetto.expiry) {
        // If the item is expired, delete the item from storage
        localStorage.removeItem(key);
        return false;
      } else {
        return true;
      }
    } else {
      return false ;
    }
  }

}
