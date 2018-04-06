import {Routes} from '@angular/router';
import {MappaComponent} from './mappa.component';
import {Mappa0Component} from './mappa0/mappa0.component';
import {Mappa1Component} from './mappa1/mappa1.component';


export const MAPPA_ROUTES: Routes = [
  {path: '', component: MappaComponent,
    children: [
      { path: '0', component: Mappa0Component},
      { path: '1', component: Mappa1Component}
    ]
  }


];
