
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Background, Attributo, Skill, Disciplina, Basicpg, Personaggio } from '../globals';


export class balance {
  nome = '';
  livello = 0;
  mensile = 0;
}
export class finanza {
  cash = 0;
  risorse = 0;
  entrate = 0;
  mybalance: Array<balance> = [];
}

export class minipg {
  Background = '';
  Annotazioni = '';
  Descrizione = '';
  ImgLG = '';
  StatusPG = 0;
  URLImg = '';
}

export class datidabio {
  full = false;
  pg = new minipg();
  
}


export class Potere {
  ID = 0;
  IDdisciplina = 0;
  LivelloPotere = 0 ;  // SE 0 Incrementale (p.es. vel)
  NomePotere = ''; 
  Passive = '';
  Auto = '';
  Target = '';
  IDattributo = 0;
  NomeAttributo = '' ; //DA LEFT JOIN
  IDskill = 0;
  NomeSkill = ''; // DA LEFT JOIN
  Meriti = '';
  NomeMerito = ''; //esplicito
  Difficolta = 0 ;  // 0 = variabile , se non Auto = S 
  DVIDattributo = 0;
  DVNomeAttributo = '' ; //DA LEFT JOIN
  DVIDskill = 0 ;
  DVNomeSkill = ''; // DA LEFT JOIN
  DVMeriti = '';
  DVNomeMerito = ''; //esplicito
  UsoSangue = 0;
  UsoFdV = 0;
  Resistito = '';
  TotaleDP = 0;
  NomeTaum = '' ;  // PER LE TAUMATURGIE
  IDtaum = 0 ;  // PER LE TAUMATURGIE
}

export class ListaPoteri {
  NomeDisc = '';
  LivelloDisc = '';
  IDdisciplina = 0;
  IcoDisc = 'dummy.png';
  pot: Array<Potere> = [];
}




@Injectable()
export class SchedaService {

  constructor( private http: HttpClient ) { }

  getpg (id: number)  {

    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getpg.php', {
      token: user,
      id: id
    }).pipe(
    map( (data) => {
      const full = data.full;
      const myPG: Personaggio = new Personaggio;
      myPG.aPG = data.pg;

      myPG.listaAttributi =  data.attr;
      myPG.listaSkill = data.skill;
      myPG.listaBackground = data.background;
      myPG.listaDiscipline = data.discipline;
      for (let i = 0 ; i < myPG.listaSkill.length ; i++) {
        myPG.listaSkill[i].Livello = +myPG.listaSkill[i].Livello;
        myPG.listaSkill[i].IDskill = +myPG.listaSkill[i].IDskill;
      }
      for (let i = 0 ; i < myPG.listaAttributi.length ; i++) {
        myPG.listaAttributi[i].Livello = +myPG.listaAttributi[i].Livello;
        myPG.listaAttributi[i].IDattributo = +myPG.listaAttributi[i].IDattributo;
      }
      for (let i = 0 ; i < myPG.listaDiscipline.length ; i++) {
        myPG.listaDiscipline[i].LivelloDisc = +myPG.listaDiscipline[i].LivelloDisc;
        myPG.listaDiscipline[i].IDdisciplina = +myPG.listaDiscipline[i].IDdisciplina;
      }
      return myPG;
    }));
  }

  getnewdiscipline (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getnewdiscipline.php', {
      token: user,
      id: id
    });
  }

  getnewnecrotaum (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getnewnecrotaum.php', {
      token: user,
      id: id
    });
  }



  getnecrotaum (id: number) {

    return this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/getnecrotaum.php?id=' + id.toString() );
  }


  getbio (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getbio.php', {
      token: user,
      id: id
    });
  }

  addbio (bio: string, descrizione: string, annotazioni: string) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/addbio.php', {
      token: user,
      bio: bio,
      descr: descrizione,
      annotazioni: annotazioni
    });
  }

  putavatar(fileToUpload: File, id: number) {
    const formData: FormData = new FormData();
    const user = sessionStorage.getItem('RBN3currentUser') ;
    formData.append('token', user);
    formData.append('id', id.toString());
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/putavatar.php', formData ).pipe(
      map(() => { return  true;} ))

  }

  getsetefdv (id: number) {
    return this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/getsete.php?id=' + id.toString()  );
  }

  getpoteri() {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/listapoteri.php', {
      token: user
    });

  }




  finanze(){
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/finanze.php', {
      token: user
    });
  }

  sendmoney(to: number, importo: number, causale: string) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/sendmoney.php', {
      token: user,
      to: to,
      importo: importo,
      causale: causale
    });
  }

}
