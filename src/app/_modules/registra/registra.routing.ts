import {Routes} from '@angular/router';
import {Registra0Component} from './registra0/registra0.component';
import {Registra1Component} from './registra1/registra1.component';


export const REGISTRA_ROUTES: Routes = [
  {path: '', component: Registra0Component},
  {path: '0', component: Registra0Component},
  {path: '1', component: Registra1Component},
  {path: '**', component: Registra0Component}
];
