import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-mappa0',
  templateUrl: './mappa0.component.html',
  styleUrls: ['./mappa0.component.css']
})
export class Mappa0Component implements OnInit {

  private map;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map' , {
      center: [41.8900 , 12.5000 ] ,
      zoom: 12,
      attributionControl: false
    });


    //const tiles = L.tileLayer('https://{{s}.basemaps.cartocdn.com/{z}/{x}/{y}.png', {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 14,
      minzoom:12 
    });

    tiles.addTo(this.map)
  };
}
