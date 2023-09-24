import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class tipooggetto {
  IDtipoOggetto = 0;
  Tipo = '';
}
export class armidaf {
  IDarma = 0;
  Nome = '';
  Descrizione = '';
  Danno = 0;
  BonusTiro = 0;
  Rate = 0;
  Raffica = '';
  Caricatore = 0;
  IDtipoOggetto = 0;
  Occultabile = '';
  Reperibilita = 0;
  Costo = 0;
  Immagine = '';
}

@Injectable({
  providedIn: 'root'
})
export class OggettiService {

  constructor(private http: HttpClient) { }

  gettipologia (){
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/gettipoogg.php');
  }
  getarmidaf (){
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/getarmidaf.php');
  }

  getcriminal() {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    // console.log(id);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/getcriminal.php', {
      token: user
    });
  }
}
