import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SPESAPX_ROUTES } from './spesapx.routing';

import { SpesapxComponent } from './spesapx.component';

import { UtilityModule } from '../utility/utility.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SPESAPX_ROUTES) ,
    UtilityModule
  ],
  declarations: [
    SpesapxComponent
  ]
})
export class SpesapxModule { }
