import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { REGISTRA_ROUTES } from './registra.routing';

import { UtilityModule } from '../utility/utility.module';

import { Registra0Component } from './registra0/registra0.component';
import { Registra1Component } from './registra1/registra1.component';
import { Registra2Component } from './registra2/registra2.component';
import { Registra3Component } from './registra3/registra3.component';
import { Registra4Component } from './registra4/registra4.component';
import { Registra5Component } from './registra5/registra5.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(REGISTRA_ROUTES) ,
    UtilityModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    Registra0Component,
    Registra1Component,
    Registra2Component,
    Registra3Component,
    Registra4Component,
    Registra5Component
  ]
})
export class RegistraModule { }
