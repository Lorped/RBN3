import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Messaggiclan {
  IDclan = 0;
  numero: number = 0 ; //num msg da ultima volta;
	ultimo: string = '';
	NomeClan: string = '';
	ClanImg: string = '';
}

export class UnMessaggioclan {
  ID = 0 ;
  IDclan = 0;
  IDMittente = 0;
  NomeMittente = '';
	Ora = '';
	URLImg: string = '';
	Testo: string = '';
}

@Injectable()
export class MessaggiService {

  constructor( private http: HttpClient ) { }

  getcontatti (id: number)  {
    return this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/getmessaggi1.php?id=' + id.toString() );
  
  }

  getmessaggi(contatto: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getmessaggi2.php', {
      token: user,
      contatto: contatto
    } );
  }

  getmessaggiclan(clanid: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getmessaggiclan.php', {
      token: user,
      clanid: clanid
    } );
  }

  sendmessaggio(contatto: number, testo: string) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    //console.log(testo);
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/putmessaggi.php', {
      token: user,
      contatto: contatto,
      testo: testo
    } );
  }


  sendmessaggioclan(clanid: number, testo: string) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    //console.log(testo);
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/putmessaggiclan.php', {
      token: user,
      clanid: clanid,
      testo: testo
    } );
  }

  cancmsg(id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    // console.log(id);
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/cancmsg.php', {
      token: user,
      id: id
    } );
  }



  contamessaggiclan(clanid?: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    if ( typeof clanid !== undefined ) {
      return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/contamessaggiclan.php', {
        token: user,
        clanid: clanid
      } );
    } else {
      return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/contamessaggiclan.php', {
        token: user
      } );
    }

  }

  contanuovimessaggi(id: number)  {
      return this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/numnewmsg.php?id=' + id.toString() );  
  }


}

