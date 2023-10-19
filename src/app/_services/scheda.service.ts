
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



import { Subject } from 'rxjs';

export class ataum {
  IDtaum = 0 ;
  Livello = 0;
  Principale = '';
  NomeTaum = '';
}
export class anecro {
  IDnecro = 0 ;
  Livello = 0;
  Principale = '';
  NomeNecro = '';
}


export class necrotaum {
  Tprincipale = 0;
  Tmaxlev = 0 ;
  taum: Array<ataum> = [];
  Nprincipale = 0 ;
  Nmaxlev = 0;
  necro: Array<anecro> = [];
}


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
  NomeNecro = '' ;  // PER LE NECROMANZIE
  IDnecro = 0 ;  // PER LE NECROMANZIE
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

  azionato  = new Subject();
  azionatoobs = this.azionato.asObservable();
  updateazionato ( newvalue: string) {
    this.azionato.next(newvalue);
  }

  constructor( private http: HttpClient ) { }

  getpg (id: number)  {

    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/getpg.php', {
      token: user,
      id: id
    });
  }

  getnewdiscipline (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/getnewdiscipline.php', {
      token: user,
      id: id
    });
  }

  getnewnecrotaum (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/getnewnecrotaum.php', {
      token: user,
      id: id
    });
  }



  getnecrotaum (id: number) {

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/getnecrotaum.php?id=' + id.toString() );
  }


  getbio (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/getbio.php', {
      token: user,
      id: id
    });
  }

  addbio (bio: string, descrizione: string, annotazioni: string) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/addbio.php', {
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



  getpoteri() {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/listapoteri.php', {
      token: user
    });

  }




  finanze(){
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/finanze.php', {
      token: user
    });
  }

  sendmoney(to: number, importo: number, causale: string) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/sendmoney.php', {
      token: user,
      to: to,
      importo: importo,
      causale: causale
    });
  }

  usapotere (ID: number, IDdisciplina: number, IDtaum: number , IDnecro: number, target: number, nometarget: string,  usofdv: boolean, stanza: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/usapotere.php', {
      token: user,
      ID: ID,
      IDdisciplina: IDdisciplina,
      IDtaum: IDtaum,
      IDnecro: IDnecro,
      target: target,
      nometarget: nometarget,
      usofdv: usofdv,
      stanza: stanza
    });
  }

  checkattr (IDattributo: number, IDskill: number, difficolta: number ,  stanza: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/check.php', {
      token: user,
      IDattributo: IDattributo,
      IDskill: IDskill,
      difficolta: difficolta,
      stanza: stanza
    });
  }

}
