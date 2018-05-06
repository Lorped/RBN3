import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { REGISTRA_ROUTES } from './registra.routing';

import { UtilityModule } from '../utility/utility.module';

import { Registra0Component } from './registra0/registra0.component';
import { Registra1Component } from './registra1/registra1.component';
import { Registra2Component } from './registra2/registra2.component';
import { Registra3Component } from './registra3/registra3.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(REGISTRA_ROUTES) ,
    UtilityModule,
    ReactiveFormsModule
  ],
  declarations: [
    Registra0Component,
    Registra1Component,
    Registra2Component,
    Registra3Component
  ]
})
export class RegistraModule { }
