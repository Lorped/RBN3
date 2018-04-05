import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { myRouting } from './app.routing' ;

import { AuthenticationService } from './_services/index';
import { ListpresentiService } from './_services/index';
import { ChatService } from './_services/index';

import { AuthGuard } from './_guards/auth.guard';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PresentiComponent } from './presenti/presenti.component';


import {Status, Personaggio} from './globals';
import { LuoghiComponent } from './luoghi/luoghi.component';
import { ChatComponent } from './chat/chat.component';
import { MappaComponent } from './mappa/mappa.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    PresentiComponent,
    LuoghiComponent,
    ChatComponent,
    MappaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    myRouting   //RouterModule.forRoot
  ],
  providers: [
    AuthenticationService,
    ListpresentiService,
    ChatService,
    AuthGuard,
    Status, Personaggio
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
