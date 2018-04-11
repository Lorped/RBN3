import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {Status} from '../globals'

@Injectable()
export class PostService {

  constructor(private http: HttpClient, private status: Status) { }


  postchat(testo: string, destinatario: number) {

    var user = sessionStorage.getItem('RBN3currentUser') ;

console.log(testo);
console.log(destinatario);
console.log(this.status.Stanza);


    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/post.php', {
      token: user,
      testo: testo,
      destinatario: destinatario,
      stanza: this.status.Stanza
    }  );
  }


}
