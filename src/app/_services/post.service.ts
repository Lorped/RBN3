import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {Status} from '../globals'

@Injectable()
export class PostService {

  constructor(private http: HttpClient, private status: Status) { }

  svuota(){
    var user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/svuota.php', {
      token: user,
      stanza: this.status.Stanza
    }  );
  }

  postchat(testo: string, destinatario: number, location: string, master: boolean, admin: boolean ) {

    var tipo="";

    var user = sessionStorage.getItem('RBN3currentUser') ;

    if (master) {
      tipo="M";
    } else if (admin) {
      tipo="A";
    }
    /*
     if (master||admin) {
      destinatario=0;
    }
    */

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/post.php', {
      token: user,
      testo: testo,
      destinatario: destinatario,
      stanza: this.status.Stanza,
      locazione: location,
      tipo: tipo
    }  );
  }


}
