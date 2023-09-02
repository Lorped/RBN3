import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapService {

  constructor(private http: HttpClient ) {}


  getmunicipi() {
    return this.http.get("/assets/geoJson/municipi.geojson");
  }
  getbase() {
    return this.http.get("/assets/geoJson/mio.geojson");
  }
}
