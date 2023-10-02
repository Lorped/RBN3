import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';

import { SPESAPX_ROUTES } from './spesapx.routing';

import { SpesapxComponent } from './spesapx.component';

import { UtilityModule } from '../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SPESAPX_ROUTES) ,
    UtilityModule,
    MatToolbarModule
  ],
  declarations: [
    SpesapxComponent
  ]
})
export class SpesapxModule { }
