
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Status } from '../globals';


export class Presenti {
  NomeCognome = '';
  Sesso = 'M';
  offgame = 0;
  Userid = 0;
  ongame = "S";
  Breve ='';
  URLImg = 'nopicture.gif';
  
}


@Injectable()
export class ListpresentiService {

  constructor(private http: HttpClient, private status: Status) { }

  getpresenti() {
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapresenti.php?id=' + this.status.Userid.toString() );

  }

  getpginstanza( stanza: number, but: number) {

    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/listapginstanza.php?dove=' + stanza.toString() + '&but=' + but.toString() );

  }

  changeonoffgame() {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    // console.log(id);
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/changeonoffgame.php', {
      token: user
    } );
  }

  moveto(stanza: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    // console.log(id);
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/moveto.php', {
      token: user,
      stanza: stanza
    } );
  }


}
