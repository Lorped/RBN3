import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../../../_services/map.service';

@Component({
  selector: 'app-mappa0',
  templateUrl: './mappa0.component.html',
  styleUrls: ['./mappa0.component.css']
})
export class Mappa0Component implements OnInit {

  private map;
  private base;  //sfondo di base //
  private municipi;


  constructor( private mapService: MapService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    this.initMap();
    
    this.mapService.getbase()
    .subscribe( (data) => {

      this.base = data;
      this.caricabase();

    });

    

    this.mapService.getmunicipi()
    .subscribe( (data) => {

      this.municipi = data;      
      this.caricamunicipi();

    });
    

  }

  initMap() {
    this.map = L.map('map' , {
      center: [ 41.90461241564262, 12.485832276556295 ] ,
      zoom: 11,
      attributionControl: false
    });


    //const tiles = L.tileLayer('https://{{s}.basemaps.cartocdn.com/{z}/{x}/{y}.png', {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      minzoom:12 
    });

    tiles.addTo(this.map);
   
  }

  caricabase(){

    const baseLayer = L.geoJson (this.base, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#000000',
        fillOpacity: 0.7,
        fillColor: '#525252'
      })
    });

    this.map.addLayer(baseLayer);

  }

  caricamunicipi(){

    const municipiLayer = L.geoJson (this.municipi, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f5b',
        fillOpacity: 0.8,
        fillColor: '#6db65b'
      })
    });

    this.map.addLayer(municipiLayer);

  }


}
