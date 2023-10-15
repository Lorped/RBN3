import { Component, OnInit } from '@angular/core';
import { QuestpxService, Questrow, SchedaService, anecro, ataum, datidabio, necrotaum } from '../../_services/index';
import { Status } from '../../globals';
import { Basicpg, Personaggio } from '../../globals';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-schedaother',
  templateUrl: './schedaother.component.html',
  styleUrls: ['./schedaother.component.css']
})
export class SchedaotherComponent implements OnInit {

  myPG: Personaggio = new Personaggio;
  myaPG: Basicpg = this.myPG.aPG;

  listaquest: Array<Questrow> = [];

  necro: Array<anecro> = [];
  taum: Array<ataum> = [];

  bio = '';
  descrizione = '';
  annotazioni = '';
  StatusPG = 0;

  myFormGroup: FormGroup;

  today: number = (new Date()).getFullYear();

  constructor( private schedaService: SchedaService, public status: Status, private questpx: QuestpxService) { }

  ngOnInit() {
    this.myaPG.URLImg="nopicture.gif";

    this.schedaService.getbio(this.status.otherID)
    .subscribe ( (data: datidabio) => {

      this.bio = data.pg.Background;
      this.descrizione = data.pg.Descrizione;
      this.annotazioni = data.pg.Annotazioni;
      this.StatusPG = data.pg.StatusPG;

      //console.log(data);

    });

    this.schedaService.getpg(this.status.otherID).subscribe( (data: Personaggio) => {

      this.myPG = data;
      this.myaPG = this.myPG.aPG;
      this.myaPG.ModSalute = Number (this.myaPG.ModSalute);

      //console.log()

    });


    if ( this.status.MasterAdmin !== 0 ) {

      this.schedaService.getnecrotaum(this.status.otherID).subscribe ( (data: necrotaum) => {
        this.necro = data.necro;
        this.taum = data.taum;
      });

      this.questpx.getquest(this.status.otherID).subscribe( (data: Array<Questrow>) => {

        this.listaquest = data;
  
      });

      this.myFormGroup = new FormGroup({
        questFC: new FormControl('', [
          Validators.required
        ]),
  
        pxFC: new FormControl(1, [
          Validators.required,
          Validators.min(1)
        ]),
      });

    }

  }

  assegna(){

    this.questpx.sendquest(this.myFormGroup.value.questFC,this.status.otherID, this.myFormGroup.value.pxFC ).subscribe ((data: Questrow)=> {
      this.listaquest.unshift(data);
      //console.log(data);
      //console.log(this.listaquest);
    });
  }

  setquest(id:number, esito: string){
    //console.log(esito);
    this.questpx.esitoquest(id, esito).subscribe (()=> {
      const idx = this.listaquest.findIndex( (xx)=> xx.IDquest == id );

      this.listaquest[idx].Status=esito;
      this.listaquest[idx].DataClose=Date();
    });
  }
  
}
