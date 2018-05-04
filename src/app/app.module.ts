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

import { AuthGuard } from './_guards/auth.guard';

import { AppComponent } from './app.component';

import { LoginComponent } from './_components/login/login.component';
// import { RegisterComponent } from './_components/register/register.component';
import { MainComponent } from './_components/main/main.component';
import { MenuComponent } from './_components/menu/menu.component';
import { PresentiComponent } from './_components/presenti/presenti.component';
import { LuoghiComponent } from './_components/luoghi/luoghi.component';
import { ModalComponent } from './_components/modal/modal.component';
import { SchedaComponent } from './_components/scheda/scheda.component';
import { QuestpxComponent } from './_components/questpx/questpx.component';

import { Status } from './globals';

import { UtilityModule } from './_modules/utility/utility.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
//    RegisterComponent,
    MainComponent,
    MenuComponent,
    PresentiComponent,
    LuoghiComponent,
    ModalComponent,
    SchedaComponent,
    QuestpxComponent

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
    AuthGuard,
    Status
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
