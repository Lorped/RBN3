import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import { APP_ROUTES } from './app.routing' ;

import { AuthenticationService } from './_services/index';
import { ListpresentiService } from './_services/index';
import { ModalService } from './_services/index';
import { SchedaService } from './_services/index';
import { QuestpxService } from './_services/index';
import { SignupService } from './_services/index';
import { AnagrafeService } from './_services/index';
import { MessaggiService } from './_services/index';
import { MatTabsModule } from '@angular/material/tabs'; 


import { AuthGuard } from './_guards/auth.guard';

import { AppComponent } from './app.component';

import { LoginComponent } from './_components/login/login.component';
import { MainComponent } from './_components/main/main.component';
import { MenuComponent } from './_components/menu/menu.component';
import { PresentiComponent } from './_components/presenti/presenti.component';
import { LuoghiComponent } from './_components/luoghi/luoghi.component';
import { ModalComponent } from './_components/modal/modal.component';
import { SchedaComponent } from './_components/scheda/scheda.component';
import { QuestpxComponent } from './_components/questpx/questpx.component';
import { BioComponent } from './_components/bio/bio.component';
import { AnagrafeComponent } from './_components/anagrafe/anagrafe.component';
import { SchedaotherComponent } from './_components/schedaother/schedaother.component';


import { Status } from './globals';

import { UtilityModule } from './_modules/utility/utility.module';

/* questi si possono cancellare */
import { PoteriComponent } from './_components/poteri/poteri.component';
import { SceltapoteriComponent } from './_components/sceltapoteri/sceltapoteri.component';
/** ************* */

import { MessaggiComponent } from './_components/messaggi/messaggi.component';
import { ReadmessaggiComponent } from './_components/readmessaggi/readmessaggi.component';
import { ReadmessaggiclanComponent } from './_components/readmessaggiclan/readmessaggiclan.component';
import { ToolvariComponent } from './_components/toolvari/toolvari.component';
import { DescluogoComponent } from './_components/descluogo/descluogo.component';
import { EmitterService } from './_services/emitter.service';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    MenuComponent,
    PresentiComponent,
    LuoghiComponent,
    ModalComponent,
    SchedaComponent,
    QuestpxComponent,
    BioComponent,
    AnagrafeComponent,
    SchedaotherComponent,
    MessaggiComponent,
    PoteriComponent,
    SceltapoteriComponent,
    ReadmessaggiComponent,
    ReadmessaggiclanComponent,
    ToolvariComponent,
    DescluogoComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, { enableTracing: true } ),
    UtilityModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTabsModule
  ],
  providers: [
    AuthenticationService,
    ListpresentiService,
    ModalService,
    SchedaService,
    QuestpxService,
    SignupService,
    AnagrafeService,
    MessaggiService,
    EmitterService,
    AuthGuard,
    Status
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
