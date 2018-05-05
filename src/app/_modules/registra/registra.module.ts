import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { REGISTRA_ROUTES } from './registra.routing';

import { UtilityModule } from '../utility/utility.module';

import { Registra0Component } from './registra0/registra0.component';
import { Registra1Component } from './registra1/registra1.component';

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
    Registra1Component
  ]
})
export class RegistraModule { }
