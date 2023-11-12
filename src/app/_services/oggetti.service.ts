import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


export class tipooggetto {
  IDtipoOggetto = 0;
  Tipo = '';
}

export class disposizione {
  tasca1 = 0;
  tasca2 = 0;
  giacca = 0;
  impermeabile = 0;
  nessuno = 0;
  tasca1_img = "slot/belt.png";
  tasca2_img = "slot/purse.png";
  giacca_img = "slot/jacket.png";
  impermeabile_img = "slot/trench.png";
  nessuno_img = "slot/out.png";
}

export class oggettibase {
  IDoggetto = 0;
  IDtipoOggetto = 0;
  Nome = '';
  Descrizione = '';
  Costo = 0;
  Immagine = 'dummy.png';
  Quantita = 0;
  Unico = '';
}

export class armi extends oggettibase{
  Danno = 0;
  BonusTiro = 0;
  Rate = 0;
  Raffica = '';
  Caricatore = 0;
  Occultabile = '';
  Reperibilita = 0;
}

export class posseduti extends armi {
  Indossato = "N" ;
  Usato = "N";
}

@Injectable({
  providedIn: 'root'
})
export class OggettiService {

  constructor(private http: HttpClient) { }

  gettipologia (){
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/gettipoogg.php');
  }
  getalloggetti (){
    const user = sessionStorage.getItem('RBN3currentUser') ;
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/getalloggetti.php',  {
      token: user
    });
  }


  getcriminal() {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    // console.log(id);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/getcriminal.php', {
      token: user
    });
  }

  compra(id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    // console.log(id);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/compra.php', {
      token: user,
      id: id
    });
  }

  getoggetti(id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    // console.log(id);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/getoggetti.php', {
      token: user,
      id: id
    });
  }

  swapinout(tipo: string , id: number){
    const user = sessionStorage.getItem('RBN3currentUser') ;
    // console.log(id);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/swapinout.php', {
      token: user,
      id: id,
      tipo: tipo
    });
  }

  swaponoff(tipo: string , id: number, stanza: number){
    const user = sessionStorage.getItem('RBN3currentUser') ;
    // console.log(id);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/swaponoff.php', {
      token: user,
      id: id,
      tipo: tipo,
      stanza: stanza
    });
  }

  cedi( destinatario: number , id: number , quantita: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    // console.log(id);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/cedi.php', {
      token: user,
      destinatario: destinatario,
      id: id,
      quantita: quantita
    });
  }

  checkckat ( ) {
    const user = sessionStorage.getItem('RBN3currentUser') ;
    // console.log(id);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/checkchat.php', {
      token: user
    });
  }
}
