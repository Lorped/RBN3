import {Routes} from '@angular/router';
import {Registra0Component} from './registra0/registra0.component';


export const REGISTRA_ROUTES: Routes = [
  {path: '', component: Registra0Component },
  {path: '**', component: Registra0Component}
];
