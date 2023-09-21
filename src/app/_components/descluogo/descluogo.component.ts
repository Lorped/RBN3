import { Component, OnInit } from '@angular/core';
import { Status } from '../../globals';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { EmitterService } from '../../_services/index';


export interface descluogo {
  ID: number;
  Dove: string;
  Breve: string;
  Descrizione: string;
  Immagine: string;
}


@Component({
  selector: 'app-descluogo',
  templateUrl: './descluogo.component.html',
  styleUrls: ['./descluogo.component.css']
})
export class DescluogoComponent implements OnInit{

  dove = 0 ;
  img = 'spacer10.png';
  nomebreve = '';
  descrizione = '';
  
  

  constructor( private status: Status,  private http: HttpClient , private emitservice: EmitterService) {}

  ngOnInit(){
    this.reload();

    this.emitservice.emitOnNavEnd().subscribe( (val ) => {
      //console.log("RICARCO PER NAVEND");
      this.reload();
    });
    this.emitservice.emitOnNavSkipped().subscribe( (val ) => {
      //console.log("RICARCO PER NAVSKIPPED");
      this.reload();
    });
    
    
  }

  reload(){
    this.dove=this.status.Stanza;
    this.getdescluogo(this.dove).subscribe( (data: Array<descluogo>) => {
      console.log(data);
      this.img = data[0].Immagine;
      this.nomebreve = data[0].Breve;
      this.descrizione = data[0].Descrizione;

    });
  }

  getdescluogo(id: number){
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/getdescluogo.php?id=' + id.toString() );
  }
}
