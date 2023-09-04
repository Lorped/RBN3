import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAPPA_ROUTES } from './mappa.routing';
import { MappaComponent } from './mappa.component';
import { Mappa0Component } from './mappa0/mappa0.component';
import { Mappa1Component } from './mappa1/mappa1.component';
import { MapService } from '../../_services/map.service';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';



@NgModule({
  declarations: [
    MappaComponent,
    Mappa0Component,
    Mappa1Component
  ],
  imports: [
    LeafletModule,
    RouterModule.forChild(MAPPA_ROUTES)
  ],
  providers: [
    MapService
  ]
})
export class MappaModule {
}
