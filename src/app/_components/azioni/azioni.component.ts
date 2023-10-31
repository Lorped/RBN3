import { Component, OnInit } from '@angular/core';
import { ListpresentiService, OggettiService, Presenti, SchedaService, SignupService, esitocura, getreg1, getreg2, posseduti } from '../../_services/index';
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

  armaFG: FormGroup = new FormGroup({
    armaFC:  new FormControl('', [
      Validators.required]),
  });

  fuocoFG: FormGroup = new FormGroup({
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
  sessvar_letali1 = false;
  sessvar_aggravati1 = false;
  sessvar_zulo = false;
  sessvar_marauder = false;
  sessvar_artigli = false;
  potenzaattiva = false;

  listaposseduti: Array<posseduti> = [];
  usato: posseduti = new posseduti();
  fuoco = 0 ;
  selettore = 0;


  constructor ( private signup: SignupService, public status: Status, public schedaservice: SchedaService, 
    private listapresenti: ListpresentiService, private oggettiservice: OggettiService) {}

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

      const found = this.myPG.listaAttributi.find ( (xx) => Number(xx.IDattributo) === 2);
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

      const found5 = this.myPG.listaSkill.find ( (xx) => Number(xx.IDskill) === 12);
      if ( found5 != null) {
        this.fuoco = Number(found5.Livello);
      }

      this.velocitaattiva = Number(localStorage.getItem('Velocita') );
      console.log("velocitaatt ", this.velocitaattiva);
      

      if ( this.velocitaattiva == 0) {
        this.destrezza = this.destrezza + this.velocita; 
      }

      this.modsalute = this.myaPG.ModSalute;

      console.log("velocita =",this.velocita);
      console.log("destrezza =",this.destrezza);
      console.log("rissa =",this.rissa);
      console.log("mischia =",this.mischia);
      console.log("fuoco =",this.fuoco);
      console.log("modsalute =",this.modsalute);
      

    });

    this.sessvar_artigli = this.check_localstorage ( 'Artigli');
    this.sessvar_letali = this.check_localstorage ( 'Letali');
    this.sessvar_aggravati = this.check_localstorage ( 'Aggravati');
    this.sessvar_zulo = this.check_localstorage ( 'Zulo');
    this.sessvar_marauder = this.check_localstorage ( 'Marauder');
    this.potenzaattiva = this.check_localstorage ( 'Potenza');

    this.sessvar_letali1 = this.check_localstorage ( 'Letali1');
    this.sessvar_aggravati1 = this.check_localstorage ( 'Aggravati1');
    
    const xx = Number( localStorage.getItem('RBN3poolaggravati') ) ;
    if (xx) {
      this.poolaggravati = xx;
    }


    this.listapresenti.getpginstanza(this.status.Stanza, this.status.Userid).subscribe( (data: Array<Presenti>) => {
      this.presenti = data;
      //console.log(this.anagrafe);
      for (let i = 0; i < this.presenti.length; i++) {
        this.presenti[i].Userid = Number(this.presenti[i].Userid);
      }

      const PNG = new Presenti();
      PNG.NomeCognome = "PNG-H";
      PNG.Userid = 0 ;

      this.presenti.push(PNG);

      const PNGV = new Presenti();
      PNGV.NomeCognome = "PNG-V";
      PNGV.Userid = -1 ;

      this.presenti.push(PNGV);
      //console.log (this.presenti);

    });
    

    this.oggettiservice.getoggetti(this.status.Userid).subscribe( (data: Array<posseduti>) => {
      const vuoto = new posseduti();
      vuoto.Nome = " - Nulla - ";
      vuoto.Immagine = "dummy2.png";
      this.listaposseduti.push( vuoto );
      for ( let i = 0 ; i< data.length ; i++) {
        if ( data[i].Indossato === 'S') {
          this.listaposseduti.push( data[i]);
        }
      }
      
      this.usato.Nome = " - Nulla - ";
      this.usato.Immagine = "dummy2.png";
      this.selettore = 0;

      const find = this.listaposseduti.find( xx => xx.Usato === "S");

      if (find) {
        this.usato = find;
        this.usato.IDtipoOggetto=Number(this.usato.IDtipoOggetto);
      }
      console.log(this.listaposseduti);
      console.log(this.usato);
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
    // console.log ("gocura");
    this.schedaservice.cura(this.status.Stanza).subscribe( (data:esitocura)=>{
      // console.log(data);
      this.status.PS=this.status.PS - Number(data.usati);
      this.myaPG.DescSalute = data.DescSalute;
      this.myaPG.daurto = Number (data.daurto);
      this.myaPG.aggravati = Number (data.aggravati);
      this.myaPG.IDsalute = Number(data.IDsalute);
      this.myaPG.ModSalute = Number(data.ModSalute);
      this.letali = 7 - this.myaPG.IDsalute - this.myaPG.daurto - this.myaPG.aggravati;
      this.poolaggravati = Number (data.poolaggravati);
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

  gorissa(){
    this.schedaservice.rissa(this.status.Stanza, this.rissaFG.value.targetFC.Userid, this.rissaFG.value.targetFC.NomeCognome, this.usofdv).subscribe((data)=>{
      this.schedaservice.updateazionato( Date() ) ;  //giusto per mettere un valore nuovo

      if (this.usofdv === true) {
        this.status.FdV = this.status.FdV - 1 ;
      }
      
      localStorage.removeItem ( 'Potenza');  //potenzaattiva
      localStorage.removeItem ( 'Letali1');  //letali 1 turno
      localStorage.removeItem ( 'Aggravati1');  //Aggravati 1 turno
      this.potenzaattiva = false;

      //dovrei fare altro tipo ridurre il contatore delle azioni liberi di velocita //
      console.log(data);
    });

    this.rissaFG.reset();
  }

  goarma(){
    console.log(this.armaFG.value.armaFC);

    if (this.armaFG.value.armaFC.IDoggetto === 0 ) {
      this.oggettiservice.swaponoff('off', 0, this.status.Stanza). subscribe( () => {
        this.schedaservice.updateazionato( Date() ) ;  //giusto per mettere un valore nuovo

        this.usato.Nome = " - Nulla - ";
        this.usato.IDoggetto = 0;
        this.usato.IDtipoOggetto = 0;
        this.usato.Immagine = 'dummy2.png';
        this.selettore = 0;

        console.log(this.usato);

      });
    } else {
      this.oggettiservice.swaponoff('on', this.armaFG.value.armaFC.IDoggetto, this.status.Stanza). subscribe( () => {
        this.schedaservice.updateazionato( Date() ) ;  //giusto per mettere un valore nuovo

        const find = this.listaposseduti.find( xx => xx.IDoggetto === this.armaFG.value.armaFC.IDoggetto);
        this.usato = find;
        this.usato.IDtipoOggetto=Number(this.usato.IDtipoOggetto);
        this.selettore = 0;
        

      });
    }
    
  }


  gofuoco(){
    this.schedaservice.fuoco(this.status.Stanza, this.fuocoFG.value.targetFC.Userid, this.fuocoFG.value.targetFC.NomeCognome, this.usofdv, this.selettore).subscribe((data)=>{
      this.schedaservice.updateazionato( Date() ) ;  //giusto per mettere un valore nuovo

      if (this.usofdv === true) {
        this.status.FdV = this.status.FdV - 1 ;
      }
      
      // Non so perchè avendo potenza e/o facendo aggravati dovrei sparare, ma in caso.... //
      localStorage.removeItem ( 'Potenza');  //potenzaattiva
      localStorage.removeItem ( 'Letali1');  //letali 1 turno
      localStorage.removeItem ( 'Aggravati1');  //Aggravati 1 turno
      this.potenzaattiva = false;

      //dovrei fare altro tipo ridurre il contatore delle azioni liberi di velocita //
      console.log(data);
    });

    this.fuocoFG.reset();

  }
  
  formatLabel(value: number): string {
    if (value === 0) {
      return 'Singolo';
    } else if ( value === 1) {
      return 'Auto';
    } else if ( value === 2) {
      return 'Raffica'
    }
    return `${value}`;
  }

}
