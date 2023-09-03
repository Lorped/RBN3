import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MapService, TabMunicipi } from '../../../_services/map.service';

@Component({
  selector: 'app-mappa0',
  templateUrl: './mappa0.component.html',
  styleUrls: ['./mappa0.component.css']
})



export class Mappa0Component implements OnInit {

  

  map;  // mappa //
  base;  //sfondo di base //
  municipi; // poly //
  info; // infobox //

  static tabMunicipi: Array<TabMunicipi> = [];


  constructor( private mapService: MapService) { }

  ngOnInit() {}
  

  ngAfterViewInit(): void {

    this.initMap();
    
    this.mapService.getbase()
    .subscribe( (data) => {
      this.base = data;
      this.caricabase();
    });

    this.mapService.getcolor().subscribe( (data: any) => {

      Mappa0Component.tabMunicipi = data ;

      // console.log (Mappa0Component.tabMunicipi);

      this.mapService.getmunicipi()
      .subscribe( (data) => {
        this.municipi = data;      
        this.caricamunicipi();
       
      });

    });

  }

  initMap() {
    this.map = L.map('map' , {
      center: [ 41.9046, 12.4858 ] ,
      zoom: 11,
      attributionControl: false
    });

    // this.map.setMaxBounds(this.map.getBounds());
    
    this.map.setMaxBounds([
      [ 42.1767, 12.9879 ],
      [ 41.5594, 11.9513 ]
    ]);
    

    //const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 14,
      minZoom:11 
    });

    tiles.addTo(this.map);   

    this.info = L.control();

    this.info.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'infobox'); // create a div with a class "infobox"
      this.update();
      return this._div;
    };
    this.info.update = function (props) {
      const ff: TabMunicipi = new(TabMunicipi);
      
      if ( props != null) {

        for ( var i = 0 ; i < Mappa0Component.tabMunicipi.length ; i++) {
          if (Mappa0Component.tabMunicipi[i].IDzona == props.ID) {
            ff.Nome =  Mappa0Component.tabMunicipi[i].Nome;
            ff.Setta = Mappa0Component.tabMunicipi[i].Setta;
            ff.SettaImg = Mappa0Component.tabMunicipi[i].SettaImg;
            ff.IDcontrollo = Mappa0Component.tabMunicipi[i].IDcontrollo;
            ff.Descrizione = Mappa0Component.tabMunicipi[i].Descrizione;
          }
        }
      }
      
      //console.log(props);
      

      if (ff.Setta != null ) {
        ff.SettaImg = '<img src="/assets/sette/' + ff.SettaImg + '" height=30 >';
        if (ff.IDcontrollo == 'P') {
          ff.Setta = ff.Setta + ' - Controllo parziale'
        }
      } else {
        ff.SettaImg = '';
        ff.Setta = 'Zona non reclamata';
      }
      
      this._div.style.cssText = "width: 25vw ;  word-wrap: break-word; color: #ffffff; background-color: #292929; ";

      this._div.innerHTML = '<div style="padding:8px;"><h4>' + (props? ff.Nome : 'Mappa di Roma') + '</h4>' +  (props ?
          ff.SettaImg + ff.Setta + '<br>' + ff.Descrizione + '</div>' : 'Individua una zona di interesse</div>' );
    };
  
    this.info.addTo(this.map);
  }


  caricabase(){
    const baseLayer = L.geoJson (this.base, {
      style: (feature) => ({
        weight: 2,
        opacity: 0.5,
        color: '#000000' ,
        fillOpacity: 0.6 ,
        fillColor: '#3d3d3d' 
      })
    });
    this.map.addLayer(baseLayer);
  }

  caricamunicipi(){

    const municipiLayer = L.geoJson (this.municipi,  {style: this.mystyle, onEachFeature: 
      (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetHighlight(e)),
          click: (e) => (this.zoomToFeature(e))
        })
      )
      }).addTo(this.map);

    this.map.addLayer(municipiLayer);


  }




  mystyle(feature) {

    var newcolor = '';
/*
    console.log(feature);
    console.log(feature.properties.ID);
    console.log ("tab");
    console.log(Mappa0Component.tabMunicipi);
*/    
    for (var i  = 0 ; i < Mappa0Component.tabMunicipi.length ; i++) {
      if (Mappa0Component.tabMunicipi[i].IDzona == feature.properties.ID) {
        newcolor = Mappa0Component.tabMunicipi[i].color ;
      }
    }


    return {
        fillColor: newcolor,
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.7
    };

  }

  highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#600',
        fillOpacity: 0.7
    });

    this.info.update(layer.feature.properties);
    layer.bringToFront();
  }
  resetHighlight(e) {
    var layer = e.target;
      layer.setStyle({
        weight: 2,
        opacity: 0.5,
        color: '#000000' 
    });
    this.info.update();
    layer.bringToFront();
  }
  zoomToFeature(e) {
    //console.log(e);
    //alert("You clicked the map at " + e.latlng)
    this.map.fitBounds(e.target.getBounds());


  }

  

}
