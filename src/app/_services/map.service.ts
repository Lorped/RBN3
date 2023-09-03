import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class TabMunicipi {
  IDzona = 0;
  color = '';
  Nome = '';
  Descrizione = '';
  Setta = '';
  SettaImg = '';
  IDcontrollo = '';
}

@Injectable()
export class MapService {

  constructor(private http: HttpClient ) {}


  getmunicipi() {
    return this.http.get("/assets/geoJson/municipi2.geojson");
  }
  getbase() {
    return this.http.get("/assets/geoJson/mio.geojson");
  }

  getcolor()  {
    return this.http.get('https://www.roma-by-night.it/RBN3/wsPHP/getcolor.php');
  }
}
