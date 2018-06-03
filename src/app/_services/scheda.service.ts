import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Background, Attributo, Skill, Disciplina, Basicpg, Personaggio } from '../globals';


@Injectable()
export class SchedaService {

  constructor( private http: HttpClient ) { }

  getpg (id: number)  {

    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getpg.php', {
      token: user,
      id: id
    })
    .map( (data) => {
      const full = data.full;
      const myPG: Personaggio = new Personaggio;
      myPG.aPG = data.pg;
      myPG.listaAttributi =  data.attr;
      myPG.listaSkill = data.skill;
      myPG.listaBackground = data.background;
      myPG.listaDiscipline = data.discipline;
      return myPG;
    });
  }

  getnewdiscipline (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getnewdiscipline.php', {
      token: user,
      id: id
    });
  }

  getnewnecrotaum (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getnewnecrotaum.php', {
      token: user,
      id: id
    });
  }



  getnecrotaum (id: number) {

    return this.http.get<any>('https://www.roma-by-night.it/RBN3/wsPHP/getnecrotaum.php?id=' + id );
  }


  getbio (id: number) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/getbio.php', {
      token: user,
      id: id
    });
  }

  addbio (bio: string, descrizione: string) {
    const user = sessionStorage.getItem('RBN3currentUser') ;

    return this.http.post<any>('https://www.roma-by-night.it/RBN3/wsPHP/addbio.php', {
      token: user,
      bio: bio,
      descr: descrizione
    });
  }

  putavatar(fileToUpload: File) {
    const formData: FormData = new FormData();
    const user = sessionStorage.getItem('RBN3currentUser') ;
    formData.append('token', user);
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post('https://www.roma-by-night.it/RBN3/wsPHP/putavatar.php', formData )
      .map(() => { return  true;} )

  }

}
