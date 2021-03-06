import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Status } from '../globals';

@Injectable()
export class PostService {

  constructor(private http: HttpClient, private status: Status) { }

  svuota() {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/svuota.php', {
      token: user,
      stanza: this.status.Stanza
    } );
  }

  postchat(testo: string, destinatario: number, location: string, master: boolean, admin: boolean ) {

    let tipo = '';

    const user = sessionStorage.getItem('RBN3currentUser') ;

    if (master) {
      tipo = 'M';
    } else if (admin) {
      tipo = 'A';
    }

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/post.php', {
      token: user,
      testo: testo,
      destinatario: destinatario,
      stanza: this.status.Stanza,
      locazione: location,
      tipo: tipo
    } );
  }


}
