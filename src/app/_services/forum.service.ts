import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class Sottobacheca {
  IDsottob = 0;
  IDbacheca  = 0 ;
  Nome = '';
  LivelloPost = 0 ;
  UltimoInserimento = 0;
  NumThread = 0;
  Nuovi = 0;

}

export class Bacheca {
  IDbacheca  = 0 ;
  Nome = '';
  LivAccesso = 0;
  icon = '';
  Sottobacheche: Array<Sottobacheca> = [];
}

export class Forumthread {
  IDmessaggio: number = 0;
  IDsottobacheca: number = 0;
  Data: string = '';
  Utente: string = '';
  Nome: string = '';
  Testo: string = '';
  OP: number = 0;
  Chiuso: number = 0;
  Pinned: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  getforum(){
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getforum.php', {
      token: user
    } );
  }

  getpostforum(id: number){
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getpostforum.php', {
      token: user,
      id: id
    } );
  }

  getforumthread(id: number){
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getforumthread.php', {
      token: user,
      id: id
    } );
  }
}
