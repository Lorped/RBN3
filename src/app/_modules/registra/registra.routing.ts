import {Routes} from '@angular/router';
import {Registra0Component} from './registra0/registra0.component';
import {Registra1Component} from './registra1/registra1.component';
import {Registra2Component} from './registra2/registra2.component';
import {Registra3Component} from './registra3/registra3.component';


export const REGISTRA_ROUTES: Routes = [
  {path: '', component: Registra0Component},
  {path: '0', component: Registra0Component},
  {path: '1', component: Registra1Component},
  {path: '2', component: Registra2Component},
  {path: '3', component: Registra3Component},
  {path: '**', component: Registra0Component}
];
