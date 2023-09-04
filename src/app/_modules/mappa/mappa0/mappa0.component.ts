import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , geoJson, Layer, MapOptions, tileLayer, latLng, icon, marker, layerGroup  } from 'leaflet';
import { MapService, TabMunicipi, aMarker } from '../../../_services/map.service';
import { Router } from '@angular/router';
import { Status } from '../../../globals';


/**   FIX ICONE */
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

/**   FIX ICONE */

@Component({
  selector: 'app-mappa0',
  templateUrl: './mappa0.component.html',
  styleUrls: ['./mappa0.component.css']
})



export class Mappa0Component implements OnInit {
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions= {
    layers:[tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 14,
      minZoom:11,
      detectRetina: true
    })],
    zoom:1,
    center: latLng( 41.9046, 12.4858 ),
    attributionControl: false
  };
  


  map: Map;  // mappa //
  zoom: number;
  static tabMunicipi: Array<TabMunicipi> = [];
  myLayers: Array<Layer> = [];

  datibase = '';
  datimunicipi = '';

  
  myMarkers: Array<aMarker> = [];
  allMarkers: Array<any> = []; 
  allMarkerLayer: Array<any> = []; 

  locationON = false;

  constructor( private mapService: MapService, private router: Router, private status: Status) { }

  ngOnInit() {

    

  }


  onMapReady(map: Map) {


    // Carico dati sulle zone + base + municipi //

    this.mapService.getcolor().subscribe( (data: any) => {
      Mappa0Component.tabMunicipi = data ;
      this.mapService.getbase().subscribe( (data: any) => {
        this.datibase = data ;
        this.mapService.getmunicipi()
        .subscribe( (data: any ) => {
          this.datimunicipi = data;      

          this.map = map;
          this.map$.emit(map);
          this.zoom = map.getZoom();
          this.zoom$.emit(this.zoom);
      
          this.map.setMaxBounds([
            [ 42.1767, 12.9879 ],
            [ 41.5594, 11.9513 ]
          ]);

          /* CREAZIONE BOX CONTROLLO */

          let info = new Control();

          info.onAdd = function (map) {
            this._div = DomUtil.create('div', 'infobox'); // create a div with a class "infobox"
            this.update();
            return this._div;
          };
          info.update = function (props) {

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
          info.addTo(this.map);

          /* CREAZIONE LAYER base */


          let baseLayer =  geoJson (this.datibase, {
            style: (feature) => ({
              weight: 2,
              opacity: 0.3,
              color: '#000000' ,
              fillOpacity: 0.3 ,
              fillColor: '#3d3d3d' 
            })
          });
          map.addLayer(baseLayer);
          this.myLayers.push(baseLayer);

          // CREAZIONE LAYER ZONE 

          const mystyle = feature => {
            var newcolor = '';
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
              fillOpacity: 0.3
            };
          }

          const highlightFeature = e => {
            const layer = e.target;
            layer.setStyle({
              weight: 4,
              color: "#600",
            });
            info.update(layer.feature.properties);
            layer.bringToFront();
          }
          const resetHighligh = e => {
            var layer = e.target;
              layer.setStyle({
                weight: 1,
                opacity: 1,
                color: 'black' 
            });
            info.update();
            layer.bringToFront();
          }
          const zoomToFeature = e => {
            //alert("You clicked the map at " + e.latlng)
            this.map.fitBounds(e.target.getBounds());
          }

          const onEachFeature = (feature, layer) => {
            layer.on({
              mouseover: highlightFeature,
              mouseout: resetHighligh,
              click: zoomToFeature
            });
          }

          let municipiLayer = geoJson ( this.datimunicipi , {
            style: mystyle,
            onEachFeature: onEachFeature
          });
          map.addLayer(municipiLayer);
          this.myLayers.push(municipiLayer);

          // MARKERS 
          const clickOnMarker = e => {
            console.log("onclick");
            console.log(e);
            console.log ( "chat = ", e.target.properties.location);
            let newloc = e.target.properties.location;
            this.status.Stanza = newloc;
            this.status.Last = 0;
            this.status.Alive = false;
            this.router.navigate(['/chat/' + newloc]);
          }

          const mouseInPopup = e => {
            e.target.openPopup();
          }
          const mouseOutPopup = e => {
            e.target.closePopup();
          }

          this.mapService.getmarker().subscribe( (data: any) => {
            this.myMarkers = data;

            for ( let i = 0; i<this.myMarkers.length ; i++) {
              const markerX = marker([this.myMarkers[i].latit, this.myMarkers[i].longit ] , {icon: iconDefault}).bindPopup(this.myMarkers[i].Breve);
              markerX.properties = {};
              markerX.properties.location = this.myMarkers[i].ID;
              markerX.on('click', clickOnMarker);
              markerX.on('mouseover', mouseInPopup);
              markerX.on('mouseout', mouseOutPopup);

              this.allMarkers.push(markerX);

            }
            this.allMarkerLayer = layerGroup(this.allMarkers);

          });

          

          /*
          const marker1 = marker([41.9144, 12.4868] , {icon: iconDefault}).bindPopup("location1");
          marker1.properties = {};
          marker1.properties.location = "1";
          marker1.on('click', clickOnMarker);
          marker1.on('mouseover', mouseInPopup);
          marker1.on('mouseout', mouseOutPopup);

          const marker2 = marker([41.9162, 12.4901] , {icon: iconDefault}).bindPopup("location2");
          marker2.properties = {};
          marker2.properties.location = "3";
          marker2.on('click', clickOnMarker);
          marker2.on('mouseover', mouseInPopup);
          marker2.on('mouseout', mouseOutPopup);

          this.allMarkers = layerGroup([marker1, marker2]);

          //this.myLayers.push(this.allMarkers);
          //this.myLayers.pop();

          */

        });
      });
    });


  
  }




  onMapZoomEnd(e: ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    //this.zoom$.emit(this.zoom);
    //console.log("zoom", e.target._zoom);
    //console.log("zoom2", this.zoom);

    if ( this.zoom > 12){
      this.myLayers.push(this.allMarkerLayer);
      this.locationON = true;
    }
    else {
      if (this.locationON) {
        this.myLayers.pop();
        this.locationON = false;
      }
    }

  }
  

  ngAfterViewInit(): void {
  }

  










  

}
