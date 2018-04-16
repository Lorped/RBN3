import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routing' ;

import { AuthenticationService } from './_services/index';
import { ListpresentiService } from './_services/index';
import { ModalService } from './_services/index';

import { AuthGuard } from './_guards/auth.guard';

import { AppComponent } from './app.component';

import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { MainComponent } from './_components/main/main.component';
import { MenuComponent } from './_components/menu/menu.component';
import { PresentiComponent } from './_components/presenti/presenti.component';
import { LuoghiComponent } from './_components/luoghi/luoghi.component';
import { ModalComponent } from './_components/modal/modal.component';

import { Status, Personaggio } from './globals';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    MenuComponent,
    PresentiComponent,
    LuoghiComponent,
    ModalComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true})
  ],
  providers: [
    AuthenticationService,
    ListpresentiService,
    ModalService,
    AuthGuard,
    Status, Personaggio
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
