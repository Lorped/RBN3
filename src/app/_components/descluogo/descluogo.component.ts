import { Component, OnInit } from '@angular/core';
import { Status } from '../../globals';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

import { EmitterService } from '../../_services/index';
import { Subscription } from 'rxjs';


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
  
  sub1: Subscription;
  sub2: Subscription;
  

  constructor( private status: Status,  private http: HttpClient , private emitservice: EmitterService) {}

  ngOnInit(){
    this.reload();

    this.sub1 = this.emitservice.emitOnNavEnd().subscribe( (val ) => {
      //console.log("RICARCO PER NAVEND");
      this.reload();
    });
    this.sub2 = this.emitservice.emitOnNavSkipped().subscribe( (val ) => {
      //console.log("RICARCO PER NAVSKIPPED");
      this.reload();
    });
    
    
  }

  reload(){
    this.dove=this.status.Stanza;
    this.getdescluogo(this.dove).subscribe( (data: Array<descluogo>) => {
      //console.log(data);
      this.img = data[0].Immagine;
      this.nomebreve = data[0].Breve;
      this.descrizione = data[0].Descrizione;

    });
  }

  getdescluogo(id: number){
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/getdescluogo.php?id=' + id.toString() );
  }

  ngOnDestroy(){
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
