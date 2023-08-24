import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routing' ;

import { AuthenticationService } from './_services/index';
import { ListpresentiService } from './_services/index';
import { ModalService } from './_services/index';
import { SchedaService } from './_services/index';
import { QuestpxService } from './_services/index';
import { SignupService } from './_services/index';
import { AnagrafeService } from './_services/index';
import { MessaggiService } from './_services/index';

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
import { MessaggiComponent } from './_components/messaggi/messaggi.component';

import { Status } from './globals';

import { UtilityModule } from './_modules/utility/utility.module';

/* questi si possono cancellare */
import { PoteriComponent } from './_components/poteri/poteri.component';
import { SceltapoteriComponent } from './_components/sceltapoteri/sceltapoteri.component';




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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true}),
    UtilityModule
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
    AuthGuard,
    Status
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
