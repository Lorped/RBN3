import {Routes} from '@angular/router';
import {SpesapxComponent} from './spesapx.component';


export const SPESAPX_ROUTES: Routes = [
  {path: '', component: SpesapxComponent },
  {path: '**', component: SpesapxComponent}
];
