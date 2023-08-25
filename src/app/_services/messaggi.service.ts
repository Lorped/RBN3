import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class MessaggiService {

  constructor( private http: HttpClient ) { }

  getcontatti (id: Number)  {
    return this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/getmessaggi1.php?id=' + id );
  
  }

  getmessaggi(contatto: Number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getmessaggi2.php', {
      token: user,
      contatto: contatto
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

  cancmsg(id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    console.log(id);
    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/cancmsg.php', {
      token: user,
      id: id
    } );
  }

}

